# Lead Generation Scope Audit

Date: June 8, 2026

## Outcome

The active Next.js routes, local practice-area data, sitemap source, navigation, and
public form choices are aligned to FCRA, FDCPA, and TCPA. Closely related debt
collection conduct remains covered through the FDCPA pathways. No separate FCCPA
service path is currently exposed.

Public references that promoted privacy/data breach and housing discrimination were
removed. Retired CMS blog topics are now excluded from listings, related posts,
static params, direct rendering, and sitemap generation. Retired consumer-law slugs
now fall through to the dynamic route's existing `notFound()` behavior instead of
redirecting relevance into unrelated services.

GCLID and UTM capture, enhanced-conversion data, Supabase lead logging, and the
qualified-lead operational workflow were preserved.

## Findings And Actions

| File | Appearance / behavior | Classification before change | Action |
| --- | --- | --- | --- |
| `data/consumer-laws.json` | Contains only `fcra`, `fdcpa`, and `tcpa` | Live/public-facing; no retired entries in the active file | Keep |
| `app/consumer-law/[slug]/page.tsx` | Static params and page lookup are driven by `consumer-laws.json`; unknown slugs call `notFound()` | Live/public-facing; correctly scoped | Keep |
| `app/consumer-law/page.tsx` | Index cards and CollectionPage schema are driven by `consumer-laws.json`; metadata said “and more” | Minor ad-relevance risk | Removed “and more”; keep JSON-driven index |
| `app/sitemap.ts` | Explicit FCRA/FDCPA/TCPA routes plus all published CMS blog rows | Blog SEO/indexing risk | Keep core routes; CMS results are now filtered before sitemap insertion |
| `next.config.ts` | Redirected privacy, VPPA, FHA, and mass-arbitration URLs to unrelated live services | SEO/ad-relevance risk | Removed redirects; old service slugs now return 404 |
| `lib/schemas.ts` | Sitewide Person `knowsAbout` advertised VPPA, FHA, data breach, and forced arbitration | Live public JSON-LD; SEO risk | Replaced with FCRA/FDCPA/TCPA-specific topics |
| `app/blog/page.tsx` | Blog JSON-LD description advertised privacy violations and generic other rights issues | Live public JSON-LD; SEO/ad-relevance risk | Rewritten to FCRA/FDCPA/TCPA topics |
| `app/blog/[slug]/page.tsx` | Blog LegalService schema advertised “data breach attorney” | Live public JSON-LD; SEO risk | Removed |
| `lib/get-blogs.ts` | Every Supabase row with `status=published` could be listed, rendered, related, statically parameterized, and submitted in the sitemap | Live CMS exposure; SEO and lead risk | Applied centralized retired-topic filtering to every read path |
| `lib/blog-scope.ts` | New centralized matcher for VPPA/video privacy/privacy claims/data breach/FHA/housing discrimination/mass or forced arbitration | Internal protective logic | Keep |
| `app/layout.tsx` | Sitewide crawl-only nav linked an AT&T settlement article with potential retired-topic relevance | Internal-link/indexing risk | Removed hardcoded link; CMS filter determines eligibility |
| `app/locations/page.tsx` | Hero said the firm handles privacy violations and housing discrimination | Live public-facing; ad-relevance and lead risk | Rewritten to FCRA/FDCPA/TCPA |
| `app/locations/fort-lauderdale/page.tsx` | FAQ and body promoted data-breach claims and privacy violations | Live public-facing plus FAQ schema; SEO/ad-relevance risk | Rewritten to FCRA/FDCPA/TCPA |
| `components/ui/case-results-cards.tsx` | Homepage displayed a privacy-breach result | Live public-facing; strong lead/ad-relevance risk | Removed privacy card |
| `components/ui/case-results.tsx` | Legacy local results array contained the same privacy card | Dormant in the current component implementation | Removed harmful stale entry |
| `app/page.tsx` | Attorney profile invited broad fraud/deceptive-practice/corporate-misconduct matters | Live public-facing; generic lead risk | Rewritten to FCRA/FDCPA/TCPA |
| `data/firms.ts` | Boynton Beach description referenced “mass consumer actions” | Live location copy; possible mass-arbitration inference | Rewritten to specific FCRA/FDCPA/TCPA claims |
| `components/forms/contact-schema.ts` | “My issue is not listed” was a selectable generic-other pathway | Live form/intake risk | Removed from public options; added an explicit six-value allowlist |
| `app/api/contact/route.ts` | JSON and multipart requests were accepted without executing `contactSchema` validation | Direct API/intake risk | Added server-side validation before email, CRM logging, or conversion response |
| `lib/actions/contact.ts` | Already validated submissions and preserved GCLID/UTM fields | Internal operational path; correctly scoped after allowlist | Keep |
| `lib/email-utils.ts`, `emails/client-qualification.tsx`, dev email preview files | `OTHER` fallback/template remains | Internal-only historical/fallback classification | Preserve; public validated submissions cannot reach it |
| `components/blog/BlogCard.tsx` | Retired-topic color branches remain | Dormant presentation logic because retired posts are filtered upstream | Keep; optional cleanup only |
| `components/ui/consumer-law-section.tsx` | Old privacy and broad seven-law copy remains | Dormant/unused; no route imports it | Preserve for now; delete only in a separate dead-code cleanup |
| `audit/pre-audit.md`, `.claude/worktrees/...` | Old retired-service content and prior audit snapshots | Historical/untracked workspace data only | Do not deploy or use as source data; no production import found |

## Form And Tracking Verification

Public case choices are now limited to:

- Credit report error
- Background check error
- Debt collector harassment
- Debt collector threats or illegal calls
- Robocalls
- Spam texts after replying STOP

The API and server action preserve `gclid`, UTM parameters, `form_source`, enhanced
conversion data, and Supabase lead logging. No code change was made to qualified-lead
review or Google Ads offline conversion import operations.

## Verification

- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
- Build route output generated only `/consumer-law/fcra`,
  `/consumer-law/fdcpa`, and `/consumer-law/tcpa` for the dynamic law route.
- `npm run lint`: repository-wide run is blocked by pre-existing lint failures and
  by ESLint traversing generated files inside the untracked `.claude` worktree.
  No new type or build failure remains.

## Manual Checks Still Required

- Deploy the changes before treating production as remediated.
- In Google Ads, confirm active ads, assets, sitelinks, keyword lists, final URLs,
  Performance Max text/assets, and negative keywords do not mention retired topics.
- In Google Search Console, request removal or recrawl of any retired URLs still
  appearing in the index after deployment.
- In Google Business Profile, confirm services, products, posts, Q&A, and business
  description list only the intended practice areas.
- Review Supabase published blog rows and unpublish/archive retired content as a
  data-governance cleanup even though the application now suppresses it.
- Continue the existing operational process: review the lead tracker, mark qualified
  leads, and upload qualified conversions through Google Ads conversion import.
