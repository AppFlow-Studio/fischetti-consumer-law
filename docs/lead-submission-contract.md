# Lead submission deployment contract

The browser keeps the existing `clf_attribution_v1` first-touch/last-touch record for 90 days. Active lead forms submit the last-touch GCLID, GBRAID, WBRAID, and UTM fields with a retry-stable `submission_id` UUID.

The server validates and normalizes the request, inserts the lead first, and treats `public.leads.id` as the canonical Lead ID. `submission_id` is only an idempotency/event identifier. It is never a replacement Lead ID.

Before deploying the application changes:

1. Apply `supabase/migrations/202608050001_lead_attribution_idempotency.sql`.
2. Configure server-only `SOURCE_WEBHOOK_URL` with the HTTPS URL for the separately managed v2 Source Apps Script deployment.
3. Configure server-only `SOURCE_WEBHOOK_SHARED_SECRET`; the server sends it as top-level JSON field `shared_secret`. Do not expose either value through a `NEXT_PUBLIC_` variable or a query parameter.

The webhook body follows the deployed v2 receiver contract: `{ "type": "INSERT", "record": { ...lead fields }, "shared_secret": "..." }`. The record uses snake_case and includes canonical `public.leads.id` as non-empty `lead_id`, `created_at`, contact fields, ZIP, `practice_area`, detailed `case_type`, source, urgency, case details, `tcpa_company` only when supplied for a TCPA case, all three Google click-ID fields, and all five UTM fields. It deliberately contains no qualification or disposition field. The website never decides that a lead is qualified.

## Separately managed Apps Script change required

Before the application webhook is enabled, publish a new Apps Script deployment that authenticates before checking `type`, reading `record`, writing the Source Sheet, or invoking any Tracker side effect:

1. Store the expected secret in an Apps Script Script Property named `SOURCE_WEBHOOK_SHARED_SECRET`.
2. Read the supplied secret only from `payload.shared_secret` after parsing the JSON body.
3. Compare supplied and expected values with a constant-work comparison that does not return early based on matching characters.
4. Reject the request when either value is missing or the comparison fails. Do not continue to the `INSERT` path.
5. Never log the full authenticated payload, the supplied secret, or the expected secret, and never include either secret in a response.

Minimal receiver logic, placed immediately after JSON parsing, is:

```js
function constantTimeEqual_(left, right) {
  left = String(left || '');
  right = String(right || '');
  var mismatch = left.length ^ right.length;
  var length = Math.max(left.length, right.length);
  for (var i = 0; i < length; i += 1) {
    mismatch |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  }
  return mismatch === 0;
}

var expectedSecret = PropertiesService.getScriptProperties()
  .getProperty('SOURCE_WEBHOOK_SHARED_SECRET');
var suppliedSecret = payload && payload.shared_secret;
if (!expectedSecret || !suppliedSecret ||
    !constantTimeEqual_(suppliedSecret, expectedSecret)) {
  return textResponse_('Unauthorized');
}
```

Because the current Supabase database webhook does not add `payload.shared_secret`, apply this authentication change at a new Apps Script deployment URL. Do not replace the working deployment in place while Supabase still targets it.

## Source delivery ownership and cutover

The application webhook is a replacement for the existing Supabase database webhook, not a coexisting delivery mechanism. The application owns delivery attempts, failures, confirmed timestamps, and replay; it cannot observe a successful delivery performed by the Supabase webhook. Enabling both therefore sends the same canonical Lead ID twice.

Keep the existing Supabase webhook enabled until all of these cutover gates pass:

1. Apply the additive database migration and deploy the application while leaving the application Source webhook unconfigured; the existing Supabase webhook remains the live delivery owner.
2. Publish the authenticated Apps Script receiver at a new URL and set its Script Property. Verify that missing/wrong secrets and malformed envelopes are rejected without Source Sheet or Tracker side effects.
3. Confirm Source deduplication uses `record.lead_id` before every append, notification, Tracker creation/update, or other downstream side effect. Confirm Tracker operations use the same Lead ID as their idempotency key. A duplicate request must exit before side effects or perform a provably idempotent update.
4. Configure `SOURCE_WEBHOOK_URL` to the new deployment and `SOURCE_WEBHOOK_SHARED_SECRET` in Vercel, then deploy during a monitored cutover window. Keep the Supabase webhook active only for the shortest verification overlap after the deduplication gate above is proven.
5. Submit one controlled lead and verify one Source row and one set of Tracker side effects for its canonical Lead ID, plus application delivery status `sent`.
6. Disable the Supabase database webhook only after that verification. From then on, the application is the sole Source delivery owner.
7. Query the cutover window by canonical Lead ID for duplicate Source rows or Tracker effects. Replay only application records whose delivery status is `failed` or `pending`; never replay records already marked `sent`.

Urgency uses exact enum values, not substring matching:

| Website value | Backend/Source value | Category | Priority | Tracker display |
|---|---|---|---|---|
| Immediate - Need help now | same exact string | Immediate | Highest | Immediate |
| Urgent - Within a week | same exact string | Urgent | High | Urgent |
| Moderate - Within a month | same exact string | Moderate | Normal | Moderate |
| Not urgent - Just exploring options | same exact string | Not urgent | Standard | Not urgent |

`Not urgent` cannot become urgent, and Moderate remains its own category.

The form returns success after the lead is persisted; email and Source delivery are independently status-tracked with attempts, timestamps, HTTP result/error, and replayable state. An authorized operator or job can replay the original validated payload via `POST /api/internal/lead-delivery/retry` with `x-lead-delivery-retry-secret`; the same `submission_id` remains idempotent.

No document upload is enabled. The repository has no private document-storage bucket, signed-upload policy, malware-scanning workflow, retention policy, or access-control decision. The thank-you page remains a low-risk case-preparation checklist until those external requirements are approved.
