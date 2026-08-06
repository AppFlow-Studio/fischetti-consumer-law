# Lead submission deployment contract

The browser keeps the existing `clf_attribution_v1` first-touch/last-touch record for 90 days. Active lead forms submit the last-touch GCLID, GBRAID, WBRAID, and UTM fields with a retry-stable `submission_id` UUID.

The server validates and normalizes the request, inserts the lead first, and treats `public.leads.id` as the canonical Lead ID. `submission_id` is only an idempotency/event identifier. It is never a replacement Lead ID.

Before deploying the application changes:

1. Apply `supabase/migrations/202608050001_lead_attribution_idempotency.sql`.
2. Configure server-only `SOURCE_WEBHOOK_URL` with the HTTPS URL for the separately managed v2 Source Apps Script deployment.
3. Configure server-only `SOURCE_WEBHOOK_SHARED_SECRET`; the server sends it in `x-source-webhook-secret`. Do not expose either value through a `NEXT_PUBLIC_` variable.

The webhook payload uses snake_case and includes `lead_id`, `created_at`, contact fields, ZIP, `practice_area`, detailed `case_type`, source, urgency, case details, TCPA contacting company when supplied, all three Google click-ID fields, and all five UTM fields. It deliberately contains no qualification or disposition field. The website never decides that a lead is qualified.

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
