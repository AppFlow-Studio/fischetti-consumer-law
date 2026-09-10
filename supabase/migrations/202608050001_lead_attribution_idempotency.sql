alter table public.leads
  add column if not exists submission_id uuid,
  add column if not exists gbraid text,
  add column if not exists wbraid text,
  add column if not exists caller_identification text,
  add column if not exists tcpa_contacting_company text,
  add column if not exists source_webhook_sent_at timestamptz;
alter table public.leads
  add column if not exists email_delivery_status text not null default 'pending',
  add column if not exists email_attempt_count integer not null default 0,
  add column if not exists email_last_attempt_at timestamptz,
  add column if not exists email_delivered_at timestamptz,
  add column if not exists email_last_error text,
  add column if not exists source_webhook_delivery_status text not null default 'pending',
  add column if not exists source_webhook_attempt_count integer not null default 0,
  add column if not exists source_webhook_last_attempt_at timestamptz,
  add column if not exists source_webhook_delivered_at timestamptz,
  add column if not exists source_webhook_last_http_status integer,
  add column if not exists source_webhook_last_error text;

create unique index if not exists leads_submission_id_unique
  on public.leads (submission_id)
  where submission_id is not null;

comment on column public.leads.submission_id is
  'Client retry/idempotency UUID. This is not the canonical Lead ID; leads.id remains canonical.';

comment on column public.leads.source_webhook_sent_at is
  'Timestamp of confirmed delivery to the v2 Source webhook.';
