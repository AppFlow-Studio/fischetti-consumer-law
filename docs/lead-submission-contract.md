# Lead submission deployment contract

The browser keeps the existing `clf_attribution_v1` first-touch/last-touch record for 90 days. Active lead forms submit the last-touch GCLID, GBRAID, WBRAID, and UTM fields with a retry-stable `submission_id` UUID.

The server validates and normalizes the request, inserts the lead first, and treats `public.leads.id` as the canonical Lead ID. `submission_id` is only an idempotency/event identifier. It is never a replacement Lead ID.

Before deploying the application changes:

1. Apply `supabase/migrations/202608050001_lead_attribution_idempotency.sql`.
2. Configure server-only `SOURCE_WEBHOOK_URL` with the HTTPS URL for the separately managed v3 Source Apps Script deployment.
3. Configure server-only `SOURCE_WEBHOOK_SHARED_SECRET`; the server sends it as top-level JSON field `shared_secret`. Do not expose either value through a `NEXT_PUBLIC_` variable or a query parameter.

The webhook body follows the v3 receiver contract: `{ "type": "INSERT", "record": { ...lead fields }, "shared_secret": "..." }`. The record uses snake_case and includes canonical `public.leads.id` as non-empty `lead_id`, `created_at`, contact fields, ZIP, `practice_area`, detailed `case_type`, source, urgency, case details, `caller_identification` for applicable FDCPA/TCPA intake and the separate `tcpa_company` only when supplied for a TCPA case, all three Google click-ID fields, and all five UTM fields. It deliberately contains no qualification or disposition field. The website never decides that a lead is qualified.

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

The application v3 webhook is a replacement for the existing Supabase v2 database webhook, not a coexisting delivery mechanism. The live v2 receiver historically transforms Source IDs to `CLF-<id>`, while v3 deliberately preserves canonical `public.leads.id`. Those identifiers cannot be assumed to deduplicate, so the two delivery paths must never be intentionally active at the same time.

Use this controlled no-overlap cutover:

1. Keep the existing Supabase v2 webhook live while preparing and validating the additive migration, application release, authenticated v3 Apps Script deployment, Script Property, and server-only Vercel variables. Do not activate application Source delivery yet.
2. Deploy the application code with application Source delivery still unconfigured. The application persists every lead before attempting Source delivery, while the old Supabase webhook remains the live delivery owner.
3. At the scheduled cutover, record a UTC preparation timestamp and the latest canonical `public.leads.id` observed before changing either delivery path.
4. Disable the old Supabase webhook and immediately record its UTC disabled timestamp. Confirm it is disabled before activating v3; do not create an overlap window.
5. Activate the new application delivery by configuring `SOURCE_WEBHOOK_URL` and `SOURCE_WEBHOOK_SHARED_SECRET` for v3 and completing the corresponding application release. Record the UTC activation timestamp.
6. Submit one controlled lead and verify its canonical numeric Lead ID is preserved in Source, its application delivery status is `sent`, and its downstream Tracker effects occur once.
7. Audit every persisted lead created between the preparation timestamp and confirmed v3 activation. Compare Supabase, Source, and Tracker using the recorded timestamps and canonical IDs, accounting for the old `CLF-<id>` transformation before cutover.
8. Replay every persisted post-disable lead whose application Source delivery is `failed` or `pending`, using its original retry-stable `submission_id`. Never replay a delivery already marked `sent`.
9. Keep the old Supabase webhook disabled after v3 verification. Roll back by disabling v3 before re-enabling v2 so the no-overlap rule remains intact.

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
