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
// Sub-components: Required Information sections (one per law type)
// Each renders a structured panel of numbered items the lead must reply with.
// ---------------------------------------------------------------------------

function FcraRequiredInfo({ accent }: { accent: string }) {
    return (
        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
            <tbody>
                <tr>
                    <td style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        padding: "0",
                        overflow: "hidden",
                    }}>
                        {/* Section header */}
                        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                            <tbody>
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
                                            Required Documents
                                        </p>
                                    </td>
                                </tr>
                                {/* Item 1 */}
                                <tr>
                                    <td style={{ padding: "0 20px" }}>
                                        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        padding: "18px 0",
                                                        borderBottom: "1px solid #e2e8f0",
                                                        verticalAlign: "top",
                                                    }}>
                                                        <table role="presentation" cellPadding="0" cellSpacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "top", paddingRight: "14px" }}>
                                                                        <div style={{
                                                                            width: "26px",
                                                                            height: "26px",
                                                                            backgroundColor: accent,
                                                                            borderRadius: "4px",
                                                                            color: "#ffffff",
                                                                            fontSize: "13px",
                                                                            fontWeight: "700",
                                                                            textAlign: "center" as const,
                                                                            lineHeight: "26px",
                                                                            flexShrink: 0,
                                                                        }}>
                                                                            1
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
                                                                            Your Credit Report (with the error highlighted)
                                                                        </p>
                                                                        <p style={{
                                                                            margin: 0,
                                                                            fontSize: "13px",
                                                                            color: "#475569",
                                                                            lineHeight: "1.5",
                                                                        }}>
                                                                            A copy of the credit report from Equifax, Experian, or TransUnion
                                                                            clearly showing the inaccurate, incomplete, or disputed item.
                                                                            Free reports are available at annualcreditreport.com.
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                {/* Item 2 */}
                                                <tr>
                                                    <td style={{
                                                        padding: "18px 0",
                                                    }}>
                                                        <table role="presentation" cellPadding="0" cellSpacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "top", paddingRight: "14px" }}>
                                                                        <div style={{
                                                                            width: "26px",
                                                                            height: "26px",
                                                                            backgroundColor: accent,
                                                                            borderRadius: "4px",
                                                                            color: "#ffffff",
                                                                            fontSize: "13px",
                                                                            fontWeight: "700",
                                                                            textAlign: "center" as const,
                                                                            lineHeight: "26px",
                                                                        }}>
                                                                            2
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
                                                                            The Credit Bureau&apos;s Response to Your Dispute
                                                                        </p>
                                                                        <p style={{
                                                                            margin: 0,
                                                                            fontSize: "13px",
                                                                            color: "#475569",
                                                                            lineHeight: "1.5",
                                                                        }}>
                                                                            A copy of the written response you received after disputing the
                                                                            error — or, if you have not yet filed a dispute, written
                                                                            confirmation that you submitted one. If no dispute has been
                                                                            filed, please note that in your reply.
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
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function FdcpaRequiredInfo({ accent }: { accent: string }) {
    const items = [
        {
            label: "Collector or Company Name",
            detail: "The full name of the debt collection agency, law firm, or individual who contacted you.",
        },
        {
            label: "Phone Number or Contact Method",
            detail: "The phone number they called or texted from, or the address if contact was by mail.",
        },
        {
            label: "A Brief Description of What Occurred",
            detail: "One to two sentences describing what happened — for example: repeated calls after being told to stop, calls before 8 AM or after 9 PM, threats of arrest or legal action, or contacting your employer.",
        },
    ]

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
                                            Required Information
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: "0 20px" }}>
                                        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                {items.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td style={{
                                                            padding: "18px 0",
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
                                                                                backgroundColor: accent,
                                                                                borderRadius: "4px",
                                                                                color: "#ffffff",
                                                                                fontSize: "13px",
                                                                                fontWeight: "700",
                                                                                textAlign: "center" as const,
                                                                                lineHeight: "26px",
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

function TcpaRequiredInfo({ accent }: { accent: string }) {
    return (
        <>
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
                                                Required Information
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "0 20px" }}>
                                            <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                <tbody>
                                                    {/* Item 1 */}
                                                    <tr>
                                                        <td style={{
                                                            padding: "18px 0",
                                                            borderBottom: "1px solid #e2e8f0",
                                                            verticalAlign: "top",
                                                        }}>
                                                            <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ verticalAlign: "top", paddingRight: "14px" }}>
                                                                            <div style={{
                                                                                width: "26px",
                                                                                height: "26px",
                                                                                backgroundColor: accent,
                                                                                borderRadius: "4px",
                                                                                color: "#ffffff",
                                                                                fontSize: "13px",
                                                                                fontWeight: "700",
                                                                                textAlign: "center" as const,
                                                                                lineHeight: "26px",
                                                                            }}>
                                                                                1
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
                                                                                Name of the Company or Caller
                                                                            </p>
                                                                            <p style={{
                                                                                margin: 0,
                                                                                fontSize: "13px",
                                                                                color: "#475569",
                                                                                lineHeight: "1.5",
                                                                            }}>
                                                                                The full name of the company or organization that called
                                                                                or texted you, as best you can determine. If unknown,
                                                                                provide the phone number they used.
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    {/* Item 2 */}
                                                    <tr>
                                                        <td style={{
                                                            padding: "18px 0",
                                                        }}>
                                                            <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ verticalAlign: "top", paddingRight: "14px" }}>
                                                                            <div style={{
                                                                                width: "26px",
                                                                                height: "26px",
                                                                                backgroundColor: accent,
                                                                                borderRadius: "4px",
                                                                                color: "#ffffff",
                                                                                fontSize: "13px",
                                                                                fontWeight: "700",
                                                                                textAlign: "center" as const,
                                                                                lineHeight: "26px",
                                                                            }}>
                                                                                2
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
                                                                                Your Do Not Call Registry Status
                                                                            </p>
                                                                            <p style={{
                                                                                margin: 0,
                                                                                fontSize: "13px",
                                                                                color: "#475569",
                                                                                lineHeight: "1.5",
                                                                            }}>
                                                                                Confirm whether your phone number is currently registered
                                                                                on the National Do Not Call Registry, and for approximately
                                                                                how long it has been registered. Registration must be active
                                                                                for at least 31 days before a call can give rise to a TCPA
                                                                                claim.
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
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* DNC gate notice — amber procedural box */}
            <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: "16px" }}>
                <tbody>
                    <tr>
                        <td style={{
                            backgroundColor: "#fffbeb",
                            border: "1px solid #fcd34d",
                            borderLeft: "4px solid #d97706",
                            borderRadius: "4px",
                            padding: "16px 20px",
                        }}>
                            <p style={{
                                margin: "0 0 6px 0",
                                fontSize: "12px",
                                fontWeight: "700",
                                color: "#92400e",
                                letterSpacing: "0.8px",
                                textTransform: "uppercase" as const,
                            }}>
                                Not Yet Registered on the Do Not Call Registry?
                            </p>
                            <p style={{
                                margin: 0,
                                fontSize: "13px",
                                color: "#78350f",
                                lineHeight: "1.6",
                            }}>
                                If your number is not yet registered, please visit{" "}
                                <a href="https://www.donotcall.gov" style={{ color: "#92400e", fontWeight: "600" }}>
                                    donotcall.gov
                                </a>{" "}
                                to register it now. Registration is free and takes less than two minutes. Once registered, your number must remain active on the registry for a minimum of 31 days before a violation can be actionable. Please contact us once that period has elapsed.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

function OtherRequiredInfo({ accent }: { accent: string }) {
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
                                            Required Information
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: "0 20px" }}>
                                        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                {[
                                                    {
                                                        label: "A Clear Description of What Happened",
                                                        detail: "Describe the situation in plain terms — who contacted you, what they said or did, and when it began.",
                                                    },
                                                    {
                                                        label: "Any Relevant Dates or Deadlines",
                                                        detail: "Let us know if there is any time sensitivity — for example, a court date, a response deadline, or a statute of limitations concern.",
                                                    },
                                                ].map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td style={{
                                                            padding: "18px 0",
                                                            borderBottom: idx === 0 ? "1px solid #e2e8f0" : "none",
                                                            verticalAlign: "top",
                                                        }}>
                                                            <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ verticalAlign: "top", paddingRight: "14px" }}>
                                                                            <div style={{
                                                                                width: "26px",
                                                                                height: "26px",
                                                                                backgroundColor: accent,
                                                                                borderRadius: "4px",
                                                                                color: "#ffffff",
                                                                                fontSize: "13px",
                                                                                fontWeight: "700",
                                                                                textAlign: "center" as const,
                                                                                lineHeight: "26px",
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
// Law-specific intro copy
// ---------------------------------------------------------------------------

function getIntroCopy(lawType: LawType): string {
    switch (lawType) {
        case "FCRA":
            return "We have received your inquiry regarding a potential Fair Credit Reporting Act (FCRA) violation. Before a formal case review can begin, we require specific documentation from you. Without these materials, our attorneys cannot evaluate the viability of your claim."
        case "FDCPA":
            return "We have received your inquiry regarding a potential Fair Debt Collection Practices Act (FDCPA) violation. Before a formal case review can begin, we need a few specific details from you. Without this information, we cannot determine whether a viable claim exists."
        case "TCPA":
            return "We have received your inquiry regarding a potential Telephone Consumer Protection Act (TCPA) violation. Before a formal case review can begin, we require confirmation of two specific facts. TCPA eligibility depends on them, and we cannot proceed without this information on file."
        default:
            return "We have received your consumer law inquiry. Before a formal case review can begin, we require additional information from you. Without this, our attorneys cannot evaluate whether a viable claim exists."
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

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`Action Required — Your ${lawLabel} Case Review`}</title>
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
                                                                                    backgroundColor: "#dc2626",
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
                                                                                    Action Required
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
                                                                {/* Accent dot */}
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

                                                {/* ── KEY CALLOUT: WE CANNOT PROCEED ── */}
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
                                                                    letterSpacing: "1.8px",
                                                                    textTransform: "uppercase" as const,
                                                                    lineHeight: "1.5",
                                                                }}>
                                                                    We cannot proceed without this information
                                                                </p>
                                                                <p style={{
                                                                    margin: "6px 0 0 0",
                                                                    fontSize: "13px",
                                                                    color: "#475569",
                                                                    lineHeight: "1.5",
                                                                }}>
                                                                    Your submission has been logged, but formal review is on hold until the items below are received.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* ── LAW-SPECIFIC REQUIRED ITEMS ── */}
                                                <p style={{
                                                    margin: "0 0 14px 0",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    color: "#64748b",
                                                    letterSpacing: "1px",
                                                    textTransform: "uppercase" as const,
                                                }}>
                                                    To move your case forward, please provide:
                                                </p>

                                                {lawType === "FCRA" && <FcraRequiredInfo accent={accent} />}
                                                {lawType === "FDCPA" && <FdcpaRequiredInfo accent={accent} />}
                                                {lawType === "TCPA" && <TcpaRequiredInfo accent={accent} />}
                                                {lawType === "OTHER" && <OtherRequiredInfo accent={accent} />}

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
                                                                                    Response Required By
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
                                                                                    5 business days from submission. If we do not receive your information by this date, this intake will be closed without further review.
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
                                                                    Reply directly to this email with the information listed above.
                                                                </p>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "13px",
                                                                    color: "#94a3b8",
                                                                    lineHeight: "1.6",
                                                                }}>
                                                                    Once received, a member of the Fischetti Law Group will review your submission and contact you with next steps. You may also call us directly at{" "}
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
                                                                                    href={`mailto:info@consumerlawflorida.com?subject=Re: ${firstName} ${lastName} — ${lawLabel} Case Information`}
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
                                                                                    Reply with Case Information →
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
