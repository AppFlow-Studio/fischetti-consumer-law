import * as React from "react"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164, ATTORNEY_NAME } from "@/lib/site"
import { type LawType, getLawTypeAccent, getLawTypeLabel } from "@/lib/email-utils"

interface ClientQualificationEmailProps {
    firstName: string
    lastName: string
    lawType: LawType
    caseRef: string
    deadlineDate: string
    submittedAt: string
}

// ---------------------------------------------------------------------------
// Item type used by all law-specific sections
// ---------------------------------------------------------------------------

interface ChecklistItem {
    label: string
    detail: string
    required?: boolean
}

// ---------------------------------------------------------------------------
// Law-specific checklists
// ---------------------------------------------------------------------------

const FCRA_ITEMS: ChecklistItem[] = [
    {
        label: "Your Credit Reports (All Three Bureaus)",
        detail: "Pull free reports from Equifax, Experian, and TransUnion at annualcreditreport.com. Highlight or circle the inaccurate, outdated, or disputed item on each report where it appears.",
        required: true,
    },
    {
        label: "Dispute Letters You Sent",
        detail: "Copies of any written disputes you submitted to the credit bureau or furnisher — by mail, online portal, or certified mail. If you have tracking or delivery confirmation, include that too.",
        required: true,
    },
    {
        label: "Bureau or Furnisher Responses",
        detail: "The written response(s) you received after disputing the error. If the bureau or furnisher said the item was \"verified\" or refused to remove it, that response is critical for your claim.",
    },
    {
        label: "Adverse Action Notices",
        detail: "Any denial letters or notices you received for credit, a loan, housing, insurance, or employment that reference your credit report. These establish that the error caused real harm.",
    },
    {
        label: "Background Check Reports (if applicable)",
        detail: "If the error appeared on a background check rather than a credit report — for example, a criminal record that isn't yours, or an eviction that belongs to someone else — include a copy of that report.",
    },
    {
        label: "Proof the Information Is Wrong",
        detail: "Documents that show why the reported item is inaccurate — for example: bank statements showing a balance was paid, a court order showing a debt was discharged in bankruptcy, or ID documents showing you are not the person named in the record.",
    },
    {
        label: "Identity Theft Report (if applicable)",
        detail: "If the inaccuracy stems from identity theft or a mixed file, include your FTC Identity Theft Report from IdentityTheft.gov, any police reports, or written alerts you placed with the bureaus.",
        required: false,
    },
]

const FDCPA_ITEMS: ChecklistItem[] = [
    {
        label: "Collector or Company Name",
        detail: "The full name of the debt collection agency, law firm, or individual who contacted you — exactly as it appears on any letters, voicemails, or caller ID.",
        required: true,
    },
    {
        label: "Letters, Emails, or Written Notices",
        detail: "Copies of any correspondence from the collector — collection notices, validation letters, settlement offers, or legal threat letters. Include the date you received each one.",
    },
    {
        label: "Call Logs with Dates, Times, and Numbers",
        detail: "Screenshots of your call history showing the phone number(s) used, dates, and times of each call. If calls came from multiple numbers, capture all of them.",
        required: true,
    },
    {
        label: "Voicemail Recordings or Transcripts",
        detail: "Any recorded voicemails left by the collector. If you cannot export the audio, write down as much of the content as you can remember — including any threats, false statements, or pressure tactics used.",
    },
    {
        label: "Text Message Screenshots",
        detail: "Screenshots of any text messages from the collector, showing the sender's number, date, time, and full message content.",
    },
    {
        label: "Records of Threats, False Statements, or Harassment",
        detail: "Written notes describing specific incidents — for example, threats of arrest, claims that you owe more than the actual debt, calls to your employer or family members, or abusive language. Include the date and time of each incident.",
    },
    {
        label: "Cease Communication Request (if sent)",
        detail: "A copy of any written letter you sent telling the collector to stop contacting you — along with proof of delivery, such as a certified mail receipt or tracking number.",
    },
    {
        label: "Court Documents (if a lawsuit was filed)",
        detail: "If the collector or a debt buyer filed a lawsuit against you, include the summons, complaint, or any other court filings you received.",
    },
]

const TCPA_ITEMS: ChecklistItem[] = [
    {
        label: "Screenshots of Spam Texts",
        detail: "Screenshots showing the sender's phone number, the date and time of each message, and the full message content. Include your STOP reply and any messages that arrived after it.",
        required: true,
    },
    {
        label: "Call Logs with Dates, Times, and Numbers",
        detail: "Screenshots of your call history showing the phone number(s) used, dates, and times of repeated calls. If the caller rotated numbers, capture as many as possible.",
        required: true,
    },
    {
        label: "Voicemail Recordings or Notifications",
        detail: "Any recorded voicemails left by the caller. If the message was deleted, a screenshot of the voicemail notification is still helpful — it shows a call occurred even without the recording.",
    },
    {
        label: "Proof of Your STOP or Opt-Out Reply",
        detail: "The date you replied STOP, said \"remove me,\" or otherwise revoked consent — and any contact that happened after that. Post-opt-out calls and texts are the strongest evidence in TCPA cases.",
        required: true,
    },
    {
        label: "Company Name or Caller Phone Numbers",
        detail: "The name of the company or organization responsible for the calls or texts, if you were able to identify it. If unknown, provide every phone number that contacted you — even spoofed or unfamiliar numbers.",
    },
    {
        label: "Website, Offer, or Product Mentioned",
        detail: "Any website URL, product name, insurance plan, or offer that was promoted in the calls or texts. This helps identify the company responsible even when the caller ID is spoofed.",
    },
    {
        label: "Do Not Call Registry Status",
        detail: "Whether your phone number is currently registered on the National Do Not Call Registry and approximately how long it has been registered. If not registered, you can sign up for free at donotcall.gov — registration must be active for at least 31 days before a DNC-based claim applies.",
    },
]

const OTHER_ITEMS: ChecklistItem[] = [
    {
        label: "A Clear Description of What Happened",
        detail: "Describe the situation in plain terms — who contacted you, what they said or did, how they contacted you, and when it began. Include the company name if you know it.",
        required: true,
    },
    {
        label: "Any Documents, Letters, or Communications",
        detail: "Copies of any paperwork, letters, emails, or screenshots related to your situation — the more context you can provide, the faster we can evaluate your case.",
    },
    {
        label: "Dates and Any Relevant Deadlines",
        detail: "Let us know if there is any time sensitivity — for example, a court date, a response deadline, or a statute of limitations concern.",
    },
]

// ---------------------------------------------------------------------------
// Shared required items renderer
// ---------------------------------------------------------------------------

function RequiredItems({ items, header }: { items: ChecklistItem[]; header: string }) {
    return (
        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
            <tbody>
                <tr>
                    <td style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        overflow: "hidden",
                    }}>
                        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                            <tbody>
                                {/* Header */}
                                <tr>
                                    <td style={{
                                        backgroundColor: "#0f172a",
                                        padding: "12px 20px",
                                    }}>
                                        <p style={{
                                            margin: 0,
                                            fontSize: "11px",
                                            fontWeight: "700",
                                            color: "#ffffff",
                                            letterSpacing: "1.5px",
                                            textTransform: "uppercase" as const,
                                        }}>
                                            {header}
                                        </p>
                                    </td>
                                </tr>
                                {/* Items */}
                                <tr>
                                    <td style={{ padding: "0 20px" }}>
                                        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                {items.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td style={{
                                                            padding: "16px 0",
                                                            borderBottom: idx < items.length - 1 ? "1px solid #e2e8f0" : "none",
                                                            verticalAlign: "top",
                                                        }}>
                                                            <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ verticalAlign: "top", paddingRight: "14px" }}>
                                                                            <div style={{
                                                                                width: "26px",
                                                                                height: "26px",
                                                                                backgroundColor: item.required === false ? "#64748b" : "#1265eb",
                                                                                borderRadius: "4px",
                                                                                color: "#ffffff",
                                                                                fontSize: "13px",
                                                                                fontWeight: "700",
                                                                                textAlign: "center" as const,
                                                                                lineHeight: "26px",
                                                                                flexShrink: 0,
                                                                            }}>
                                                                                {idx + 1}
                                                                            </div>
                                                                        </td>
                                                                        <td style={{ verticalAlign: "top" }}>
                                                                            <p style={{
                                                                                margin: "0 0 4px 0",
                                                                                fontSize: "14px",
                                                                                fontWeight: "600",
                                                                                color: "#0f172a",
                                                                                lineHeight: "1.4",
                                                                            }}>
                                                                                {item.label}
                                                                                {item.required === false && (
                                                                                    <span style={{
                                                                                        marginLeft: "8px",
                                                                                        fontSize: "11px",
                                                                                        fontWeight: "500",
                                                                                        color: "#94a3b8",
                                                                                        textTransform: "uppercase" as const,
                                                                                        letterSpacing: "0.5px",
                                                                                    }}>
                                                                                        (if applicable)
                                                                                    </span>
                                                                                )}
                                                                            </p>
                                                                            <p style={{
                                                                                margin: 0,
                                                                                fontSize: "13px",
                                                                                color: "#475569",
                                                                                lineHeight: "1.5",
                                                                            }}>
                                                                                {item.detail}
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

// ---------------------------------------------------------------------------
// TCPA DNC gate notice (shown below the TCPA checklist)
// ---------------------------------------------------------------------------

function TcpaDncNotice({ accent }: { accent: string }) {
    return (
        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: "16px" }}>
            <tbody>
                <tr>
                    <td style={{
                        backgroundColor: "#f0f4ff",
                        border: "1px solid #dde6f9",
                        borderLeft: `4px solid ${accent}`,
                        borderRadius: "4px",
                        padding: "16px 20px",
                    }}>
                        <p style={{
                            margin: "0 0 6px 0",
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#0f172a",
                            letterSpacing: "0.8px",
                            textTransform: "uppercase" as const,
                        }}>
                            Not on the Do Not Call Registry?
                        </p>
                        <p style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#475569",
                            lineHeight: "1.6",
                        }}>
                            No problem — visit{" "}
                            <a href="https://www.donotcall.gov" style={{ color: "#1265eb", fontWeight: "600" }}>
                                donotcall.gov
                            </a>{" "}
                            to register your number now. Registration is free and takes under two minutes. Note that DNC registration must be active for at least 31 days before a violation based on that registration can be pursued — but many TCPA claims do not require DNC registration at all, especially if calls were made using an autodialer or prerecorded voice without your consent.
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

// ---------------------------------------------------------------------------
// Law-specific intro copy
// ---------------------------------------------------------------------------

function getIntroCopy(lawType: LawType): string {
    switch (lawType) {
        case "FCRA":
            return "We've received your case review request for a potential Fair Credit Reporting Act (FCRA) violation. To evaluate your claim as quickly as possible, please gather the documents listed below. Having these ready before we speak will help our attorneys give you the most accurate assessment of your case."
        case "FDCPA":
            return "We've received your case review request for a potential Fair Debt Collection Practices Act (FDCPA) violation. The checklist below covers the evidence our attorneys will want to review. The more of this you have ready, the faster we can determine what happened and what you may be owed."
        case "TCPA":
            return "We've received your case review request for a potential Telephone Consumer Protection Act (TCPA) violation. Before we speak, please gather as much of the evidence listed below as you can. Even partial records can be enough to establish a strong claim."
        default:
            return "We've received your consumer law inquiry. The checklist below will help you prepare for your case review. Please gather as much of this information as you can before we follow up — the more context you can provide, the faster our attorneys can evaluate your situation."
    }
}

function getEmailSubject(lawType: LawType, lawLabel: string): string {
    switch (lawType) {
        case "FCRA":
            return `Your FCRA Case Checklist — Documents to Gather`
        case "FDCPA":
            return `Your FDCPA Case Checklist — Evidence to Collect`
        case "TCPA":
            return `Your TCPA Case Checklist — What to Save Now`
        default:
            return `Your ${lawLabel} Case Checklist`
    }
}

// ---------------------------------------------------------------------------
// Main email component
// ---------------------------------------------------------------------------

export function ClientQualificationEmail({
    firstName,
    lastName,
    lawType,
    caseRef,
    deadlineDate,
    submittedAt,
}: ClientQualificationEmailProps) {
    const accent = getLawTypeAccent(lawType)
    const lawLabel = getLawTypeLabel(lawType)
    const introCopy = getIntroCopy(lawType)

    const checklistItems = lawType === "FCRA" ? FCRA_ITEMS
        : lawType === "FDCPA" ? FDCPA_ITEMS
        : lawType === "TCPA" ? TCPA_ITEMS
        : OTHER_ITEMS

    const checklistHeader = lawType === "FCRA" ? "Documents to Gather"
        : lawType === "FDCPA" ? "Evidence to Collect"
        : lawType === "TCPA" ? "Evidence to Save"
        : "Information to Prepare"

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{getEmailSubject(lawType, lawLabel)}</title>
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                backgroundColor: "#eef2f7",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            }}>
                {/* Outer wrapper */}
                <table
                    role="presentation"
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ backgroundColor: "#eef2f7" }}
                >
                    <tbody>
                        <tr>
                            <td align="center" style={{ padding: "40px 16px" }}>

                                {/* ── Main container ── */}
                                <table
                                    role="presentation"
                                    width="600"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    style={{
                                        maxWidth: "600px",
                                        width: "100%",
                                        backgroundColor: "#ffffff",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        boxShadow: "0 2px 8px rgba(5,25,55,0.12)",
                                    }}
                                >
                                    <tbody>

                                        {/* ── HEADER ── */}
                                        <tr>
                                            <td style={{
                                                backgroundColor: "#0a2d6b",
                                                padding: "28px 36px",
                                            }}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ verticalAlign: "middle" }}>
                                                                <img
                                                                    src="https://consumerlawflorida.com/fischettiwhite-logo.png"
                                                                    alt="Fischetti Law Group"
                                                                    width="200"
                                                                    height="auto"
                                                                    style={{
                                                                        display: "block",
                                                                        maxWidth: "200px",
                                                                        height: "auto",
                                                                    }}
                                                                />
                                                            </td>
                                                            <td style={{ textAlign: "right" as const, verticalAlign: "middle" }}>
                                                                <table
                                                                    role="presentation"
                                                                    cellPadding="0"
                                                                    cellSpacing="0"
                                                                    align="right"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    width: "3px",
                                                                                    minWidth: "3px",
                                                                                    backgroundColor: accent,
                                                                                }}
                                                                            >
                                                                                &nbsp;
                                                                            </td>
                                                                            <td style={{ paddingLeft: "12px", verticalAlign: "middle" }}>
                                                                                <span style={{
                                                                                    fontSize: "11px",
                                                                                    fontWeight: "800",
                                                                                    color: "#f8fafc",
                                                                                    letterSpacing: "2px",
                                                                                    textTransform: "uppercase" as const,
                                                                                    lineHeight: "1.25",
                                                                                }}>
                                                                                    Case Checklist
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* ── RECEIPT STRIP ── */}
                                        <tr>
                                            <td style={{
                                                backgroundColor: "#0f172a",
                                                padding: "10px 36px",
                                            }}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <span style={{
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    color: "#cbd5e1",
                                                                    letterSpacing: "0.2px",
                                                                }}>
                                                                    {firstName} {lastName}
                                                                </span>
                                                                <span style={{
                                                                    fontSize: "11px",
                                                                    color: "#475569",
                                                                    marginLeft: "10px",
                                                                }}>
                                                                    Ref: {caseRef}
                                                                </span>
                                                            </td>
                                                            <td style={{ textAlign: "right" as const }}>
                                                                <span style={{
                                                                    fontSize: "11px",
                                                                    color: "#64748b",
                                                                    letterSpacing: "0.3px",
                                                                }}>
                                                                    Received: {submittedAt}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* ── LAW TYPE TAG ── */}
                                        <tr>
                                            <td style={{
                                                backgroundColor: "#f8fafc",
                                                borderBottom: "2px solid #e2e8f0",
                                                padding: "14px 36px",
                                            }}>
                                                <table role="presentation" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ paddingRight: "10px", verticalAlign: "middle" }}>
                                                                <div style={{
                                                                    width: "8px",
                                                                    height: "8px",
                                                                    borderRadius: "50%",
                                                                    backgroundColor: accent,
                                                                }} />
                                                            </td>
                                                            <td style={{ verticalAlign: "middle" }}>
                                                                <span style={{
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    color: "#475569",
                                                                    letterSpacing: "0.5px",
                                                                    textTransform: "uppercase" as const,
                                                                }}>
                                                                    {lawLabel} — Intake Review
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* ── BODY ── */}
                                        <tr>
                                            <td style={{ padding: "36px 36px 0 36px" }}>

                                                {/* Salutation */}
                                                <p style={{
                                                    margin: "0 0 20px 0",
                                                    fontSize: "22px",
                                                    fontWeight: "700",
                                                    color: "#0f172a",
                                                    lineHeight: "1.3",
                                                }}>
                                                    Dear {firstName},
                                                </p>

                                                {/* Intro paragraph */}
                                                <p style={{
                                                    margin: "0 0 28px 0",
                                                    fontSize: "15px",
                                                    color: "#334155",
                                                    lineHeight: "1.7",
                                                }}>
                                                    {introCopy}
                                                </p>

                                                {/* ── HELPFUL CALLOUT ── */}
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: "28px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{
                                                                backgroundColor: "#f0f4ff",
                                                                borderLeft: `4px solid ${accent}`,
                                                                borderRadius: "4px",
                                                                padding: "18px 20px",
                                                            }}>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "13px",
                                                                    fontWeight: "800",
                                                                    color: "#0f172a",
                                                                    letterSpacing: "1.2px",
                                                                    textTransform: "uppercase" as const,
                                                                    lineHeight: "1.5",
                                                                }}>
                                                                    Here&apos;s your case preparation checklist
                                                                </p>
                                                                <p style={{
                                                                    margin: "6px 0 0 0",
                                                                    fontSize: "13px",
                                                                    color: "#475569",
                                                                    lineHeight: "1.5",
                                                                }}>
                                                                    Don&apos;t worry if you don&apos;t have everything — gather what you can and reply with what you have. Our team will let you know if we need anything else.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* ── LAW-SPECIFIC CHECKLIST ── */}
                                                <p style={{
                                                    margin: "0 0 14px 0",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    color: "#64748b",
                                                    letterSpacing: "1px",
                                                    textTransform: "uppercase" as const,
                                                }}>
                                                    What to gather before we speak:
                                                </p>

                                                <RequiredItems items={checklistItems} header={checklistHeader} />

                                                {lawType === "TCPA" && <TcpaDncNotice accent={accent} />}

                                            </td>
                                        </tr>

                                        {/* ── DEADLINE NOTICE ── */}
                                        <tr>
                                            <td style={{ padding: "28px 36px 0 36px" }}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{
                                                                backgroundColor: "#0f172a",
                                                                borderLeft: `6px solid ${accent}`,
                                                                borderRadius: "6px",
                                                                padding: "0",
                                                                overflow: "hidden",
                                                            }}>
                                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    height: "3px",
                                                                                    lineHeight: "3px",
                                                                                    fontSize: "1px",
                                                                                    backgroundColor: accent,
                                                                                }}
                                                                            >
                                                                                &nbsp;
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ padding: "18px 24px 0 24px" }}>
                                                                                <p style={{
                                                                                    margin: 0,
                                                                                    fontSize: "10px",
                                                                                    fontWeight: "700",
                                                                                    color: "#94a3b8",
                                                                                    letterSpacing: "2px",
                                                                                    textTransform: "uppercase" as const,
                                                                                    lineHeight: "1.4",
                                                                                }}>
                                                                                    Reply By
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ padding: "8px 24px 0 24px" }}>
                                                                                <p style={{
                                                                                    margin: 0,
                                                                                    fontSize: "26px",
                                                                                    fontWeight: "700",
                                                                                    color: "#f8fafc",
                                                                                    lineHeight: "1.15",
                                                                                    letterSpacing: "-0.4px",
                                                                                }}>
                                                                                    {deadlineDate}
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        {/* Divider */}
                                                                        <tr>
                                                                            <td style={{ padding: "14px 24px 0 24px" }}>
                                                                                <div style={{
                                                                                    height: "1px",
                                                                                    backgroundColor: "#334155",
                                                                                }} />
                                                                            </td>
                                                                        </tr>
                                                                        {/* Body row */}
                                                                        <tr>
                                                                            <td style={{ padding: "12px 24px 20px 24px" }}>
                                                                                <p style={{
                                                                                    margin: 0,
                                                                                    fontSize: "12px",
                                                                                    color: "#cbd5e1",
                                                                                    lineHeight: "1.65",
                                                                                }}>
                                                                                    5 business days from submission. Reply to this email with whatever you have — even partial records help. We&apos;ll follow up with any questions.
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* ── REPLY CTA ── */}
                                        <tr>
                                            <td style={{ padding: "28px 36px 0 36px" }}>
                                                <table
                                                    role="presentation"
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                        backgroundColor: "#051937",
                                                        borderRadius: "6px",
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ padding: "24px 24px 8px 24px" }}>
                                                                <p style={{
                                                                    margin: "0 0 8px 0",
                                                                    fontSize: "11px",
                                                                    fontWeight: "700",
                                                                    color: "#64748b",
                                                                    letterSpacing: "1.2px",
                                                                    textTransform: "uppercase" as const,
                                                                }}>
                                                                    How to Respond
                                                                </p>
                                                                <p style={{
                                                                    margin: "0 0 12px 0",
                                                                    fontSize: "16px",
                                                                    fontWeight: "600",
                                                                    color: "#ffffff",
                                                                    lineHeight: "1.4",
                                                                }}>
                                                                    Reply directly to this email with the documents or information listed above.
                                                                </p>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "13px",
                                                                    color: "#94a3b8",
                                                                    lineHeight: "1.6",
                                                                }}>
                                                                    Once received, a member of the Fischetti Law Group will review your submission and contact you within 24 hours. You may also call us directly at{" "}
                                                                    <a
                                                                        href={`tel:${PRIMARY_PHONE_E164}`}
                                                                        style={{ color: "#93c5fd", textDecoration: "none", fontWeight: "600" }}
                                                                    >
                                                                        {PRIMARY_PHONE}
                                                                    </a>.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "16px 24px 24px 24px" }}>
                                                                <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{
                                                                                backgroundColor: accent,
                                                                                borderRadius: "4px",
                                                                                padding: "0",
                                                                            }}>
                                                                                <a
                                                                                    href={`mailto:info@consumerlawflorida.com?subject=Re: ${firstName} ${lastName} — ${lawLabel} Case Documents`}
                                                                                    style={{
                                                                                        display: "inline-block",
                                                                                        padding: "12px 24px",
                                                                                        fontSize: "13px",
                                                                                        fontWeight: "700",
                                                                                        color: "#ffffff",
                                                                                        textDecoration: "none",
                                                                                        letterSpacing: "0.3px",
                                                                                        borderRadius: "4px",
                                                                                    }}
                                                                                >
                                                                                    Reply with Documents →
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* ── SIGNATURE ── */}
                                        <tr>
                                            <td style={{ padding: "32px 36px 36px 36px" }}>
                                                <table role="presentation" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{
                                                                borderLeft: "3px solid #e2e8f0",
                                                                paddingLeft: "16px",
                                                            }}>
                                                                <p style={{
                                                                    margin: "0 0 2px 0",
                                                                    fontSize: "14px",
                                                                    fontWeight: "600",
                                                                    color: "#0f172a",
                                                                }}>
                                                                    {ATTORNEY_NAME}
                                                                </p>
                                                                <p style={{
                                                                    margin: "0 0 2px 0",
                                                                    fontSize: "13px",
                                                                    color: "#475569",
                                                                }}>
                                                                    Fischetti Law Group
                                                                </p>
                                                                <p style={{ margin: 0 }}>
                                                                    <a
                                                                        href="https://www.consumerlawflorida.com"
                                                                        style={{
                                                                            fontSize: "12px",
                                                                            color: "#1265eb",
                                                                            textDecoration: "none",
                                                                        }}
                                                                    >
                                                                        consumerlawflorida.com
                                                                    </a>
                                                                    <span style={{ color: "#cbd5e1", margin: "0 8px" }}>·</span>
                                                                    <a
                                                                        href={`tel:${PRIMARY_PHONE_E164}`}
                                                                        style={{
                                                                            fontSize: "12px",
                                                                            color: "#475569",
                                                                            textDecoration: "none",
                                                                        }}
                                                                    >
                                                                        {PRIMARY_PHONE}
                                                                    </a>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* ── FOOTER ── */}
                                        <tr>
                                            <td style={{
                                                backgroundColor: "#051937",
                                                padding: "24px 36px",
                                                borderTop: "1px solid #0a2d6b",
                                            }}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ textAlign: "center" as const }}>
                                                                <p style={{
                                                                    margin: "0 0 6px 0",
                                                                    fontSize: "12px",
                                                                    color: "#64748b",
                                                                }}>
                                                                    Fischetti Law Group
                                                                </p>
                                                                <p style={{
                                                                    margin: "0 0 10px 0",
                                                                    fontSize: "12px",
                                                                    color: "#475569",
                                                                }}>
                                                                    7593 Boynton Beach Blvd, Suite 110, Boynton Beach, FL 33437
                                                                </p>
                                                                <p style={{
                                                                    margin: "0 0 16px 0",
                                                                    fontSize: "12px",
                                                                    color: "#475569",
                                                                }}>
                                                                    <a href={`tel:${PRIMARY_PHONE_E164}`} style={{ color: "#64748b", textDecoration: "none" }}>
                                                                        {PRIMARY_PHONE}
                                                                    </a>
                                                                    <span style={{ margin: "0 8px", color: "#334155" }}>·</span>
                                                                    <a href="mailto:info@consumerlawflorida.com" style={{ color: "#64748b", textDecoration: "none" }}>
                                                                        info@consumerlawflorida.com
                                                                    </a>
                                                                </p>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "11px",
                                                                    color: "#334155",
                                                                    lineHeight: "1.6",
                                                                }}>
                                                                    This communication is confidential and intended solely for {firstName}. It does not constitute legal advice and does not create an attorney-client relationship. No attorney-client relationship is formed until a signed engagement agreement is in place.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                {/* ── end main container ── */}

                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    )
}

export default ClientQualificationEmail
