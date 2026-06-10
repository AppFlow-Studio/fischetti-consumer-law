import * as React from "react"

interface OfficeNotificationEmailProps {
    firstName: string
    lastName: string
    email: string
    phone: string
    zip: string
    caseType: string
    callerIdentification?: string
    urgency: string
    description: string
    submittedAt: string
}

function getUrgencyColor(urgency: string): { bg: string; text: string; label: string } {
    if (urgency.toLowerCase().includes("immediate")) {
        return { bg: "#fef2f2", text: "#991b1b", label: "IMMEDIATE" }
    }
    if (urgency.toLowerCase().includes("urgent")) {
        return { bg: "#fff7ed", text: "#9a3412", label: "URGENT" }
    }
    if (urgency.toLowerCase().includes("moderate")) {
        return { bg: "#fefce8", text: "#854d0e", label: "MODERATE" }
    }
    return { bg: "#f0fdf4", text: "#166534", label: "STANDARD" }
}

export function OfficeNotificationEmail({
    firstName,
    lastName,
    email,
    phone,
    zip,
    caseType,
    callerIdentification,
    urgency,
    description,
    submittedAt,
}: OfficeNotificationEmailProps) {
    const urgencyStyle = getUrgencyColor(urgency)
    const isHighPriority = urgency.toLowerCase().includes("immediate") || urgency.toLowerCase().includes("urgent")

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`New Lead: ${firstName} ${lastName}`}</title>
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                backgroundColor: "#f1f5f9",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            }}>
                {/* Wrapper Table */}
                <table
                    role="presentation"
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ backgroundColor: "#f1f5f9" }}
                >
                    <tbody>
                        <tr>
                            <td align="center" style={{ padding: "40px 20px" }}>
                                {/* Main Container */}
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
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <tbody>
                                        {/* Header */}
                                        <tr>
                                            <td style={{
                                                background: "#051937",
                                                padding: "20px 32px",
                                            }}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img
                                                                    src="https://consumerlawflorida.com/fischettiwhite-logo.png"
                                                                    alt="Fischetti Law Group"
                                                                    width="160"
                                                                    height="auto"
                                                                    style={{
                                                                        display: "block",
                                                                        maxWidth: "160px",
                                                                        height: "auto",
                                                                    }}
                                                                />
                                                            </td>
                                                            <td style={{ textAlign: "right" as const }}>
                                                                <span style={{
                                                                    display: "inline-block",
                                                                    backgroundColor: "#10b981",
                                                                    color: "#ffffff",
                                                                    fontSize: "11px",
                                                                    fontWeight: "600",
                                                                    padding: "6px 12px",
                                                                    borderRadius: "4px",
                                                                    letterSpacing: "0.5px",
                                                                }}>
                                                                    NEW LEAD
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Priority Banner (if high priority) */}
                                        {isHighPriority && (
                                            <tr>
                                                <td style={{
                                                    backgroundColor: urgencyStyle.bg,
                                                    padding: "12px 32px",
                                                    borderBottom: `2px solid ${urgencyStyle.text}`,
                                                }}>
                                                    <p style={{
                                                        margin: 0,
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        color: urgencyStyle.text,
                                                        textAlign: "center" as const,
                                                        letterSpacing: "0.5px",
                                                    }}>
                                                        ⚡ {urgencyStyle.label} PRIORITY — Respond within 24 hours
                                                    </p>
                                                </td>
                                            </tr>
                                        )}

                                        {/* Main Content */}
                                        <tr>
                                            <td style={{ padding: "32px" }}>
                                                {/* Lead Summary */}
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: "24px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <p style={{
                                                                    margin: "0 0 4px 0",
                                                                    fontSize: "24px",
                                                                    fontWeight: "700",
                                                                    color: "#0f172a",
                                                                }}>
                                                                    {firstName} {lastName}
                                                                </p>
                                                                <p style={{
                                                                    margin: "0 0 8px 0",
                                                                    fontSize: "15px",
                                                                    fontWeight: "500",
                                                                    color: "#1265eb",
                                                                }}>
                                                                    {caseType}
                                                                </p>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "13px",
                                                                    color: "#64748b",
                                                                }}>
                                                                    Submitted {submittedAt}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* Quick Actions */}
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: "24px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ paddingRight: "8px", width: "50%" }}>
                                                                <a
                                                                    href={`tel:${phone.replace(/\D/g, "")}`}
                                                                    style={{
                                                                        display: "block",
                                                                        backgroundColor: "#1265eb",
                                                                        color: "#ffffff",
                                                                        fontSize: "14px",
                                                                        fontWeight: "600",
                                                                        padding: "12px 16px",
                                                                        borderRadius: "6px",
                                                                        textDecoration: "none",
                                                                        textAlign: "center" as const,
                                                                    }}
                                                                >
                                                                    📞 Call Now
                                                                </a>
                                                            </td>
                                                            <td style={{ paddingLeft: "8px", width: "50%" }}>
                                                                <a
                                                                    href={`mailto:${email}`}
                                                                    style={{
                                                                        display: "block",
                                                                        backgroundColor: "#ffffff",
                                                                        color: "#1265eb",
                                                                        fontSize: "14px",
                                                                        fontWeight: "600",
                                                                        padding: "12px 16px",
                                                                        borderRadius: "6px",
                                                                        textDecoration: "none",
                                                                        textAlign: "center" as const,
                                                                        border: "2px solid #1265eb",
                                                                    }}
                                                                >
                                                                    ✉️ Send Email
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* Contact Information */}
                                                <table
                                                    role="presentation"
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                        marginBottom: "24px",
                                                        borderCollapse: "collapse" as const,
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={2} style={{
                                                                paddingBottom: "12px",
                                                                borderBottom: "1px solid #e2e8f0",
                                                            }}>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    color: "#64748b",
                                                                    textTransform: "uppercase" as const,
                                                                    letterSpacing: "0.5px",
                                                                }}>
                                                                    Contact Information
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "12px 0", color: "#64748b", fontSize: "14px", width: "100px" }}>
                                                                Email
                                                            </td>
                                                            <td style={{ padding: "12px 0", fontSize: "14px" }}>
                                                                <a href={`mailto:${email}`} style={{ color: "#1265eb", textDecoration: "none" }}>{email}</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "12px 0", color: "#64748b", fontSize: "14px", borderTop: "1px solid #f1f5f9" }}>
                                                                Phone
                                                            </td>
                                                            <td style={{ padding: "12px 0", fontSize: "14px", borderTop: "1px solid #f1f5f9" }}>
                                                                <a href={`tel:${phone.replace(/\D/g, "")}`} style={{ color: "#1265eb", textDecoration: "none" }}>{phone}</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "12px 0", color: "#64748b", fontSize: "14px", borderTop: "1px solid #f1f5f9" }}>
                                                                ZIP Code
                                                            </td>
                                                            <td style={{ padding: "12px 0", fontSize: "14px", color: "#0f172a", borderTop: "1px solid #f1f5f9" }}>
                                                                {zip}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* Case Details */}
                                                <table
                                                    role="presentation"
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                        marginBottom: "24px",
                                                        borderCollapse: "collapse" as const,
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={2} style={{
                                                                paddingBottom: "12px",
                                                                borderBottom: "1px solid #e2e8f0",
                                                            }}>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    color: "#64748b",
                                                                    textTransform: "uppercase" as const,
                                                                    letterSpacing: "0.5px",
                                                                }}>
                                                                    Case Details
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "12px 0", color: "#64748b", fontSize: "14px", width: "100px" }}>
                                                                Type
                                                            </td>
                                                            <td style={{ padding: "12px 0", fontSize: "14px", color: "#0f172a", fontWeight: "500" }}>
                                                                {caseType}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "12px 0", color: "#64748b", fontSize: "14px", borderTop: "1px solid #f1f5f9", verticalAlign: "top" }}>
                                                                Urgency
                                                            </td>
                                                            <td style={{ padding: "12px 0", fontSize: "14px", borderTop: "1px solid #f1f5f9" }}>
                                                                <span style={{
                                                                    display: "inline-block",
                                                                    backgroundColor: urgencyStyle.bg,
                                                                    color: urgencyStyle.text,
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    padding: "4px 10px",
                                                                    borderRadius: "4px",
                                                                }}>
                                                                    {urgency}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        {callerIdentification && (
                                                            <tr>
                                                                <td style={{ padding: "12px 0", color: "#64748b", fontSize: "14px", borderTop: "1px solid #f1f5f9", verticalAlign: "top" }}>
                                                                    Caller / Company
                                                                </td>
                                                                <td style={{ padding: "12px 0", fontSize: "14px", color: "#0f172a", borderTop: "1px solid #f1f5f9" }}>
                                                                    {callerIdentification}
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>

                                                {/* Description */}
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: "24px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{
                                                                paddingBottom: "12px",
                                                                borderBottom: "1px solid #e2e8f0",
                                                            }}>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    color: "#64748b",
                                                                    textTransform: "uppercase" as const,
                                                                    letterSpacing: "0.5px",
                                                                }}>
                                                                    Case Description
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{
                                                                padding: "16px",
                                                                backgroundColor: "#f8fafc",
                                                                borderRadius: "6px",
                                                                marginTop: "12px",
                                                            }}>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "14px",
                                                                    color: "#334155",
                                                                    lineHeight: "1.6",
                                                                    whiteSpace: "pre-wrap" as const,
                                                                }}>
                                                                    {description}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* Reminder */}
                                                <table
                                                    role="presentation"
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                        backgroundColor: "#fefce8",
                                                        borderRadius: "6px",
                                                        border: "1px solid #fef08a",
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ padding: "12px 16px", textAlign: "center" as const }}>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "13px",
                                                                    color: "#854d0e",
                                                                    fontWeight: "500",
                                                                }}>
                                                                    ⏰ Client expects contact within 24 hours
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Footer */}
                                        <tr>
                                            <td style={{
                                                backgroundColor: "#f8fafc",
                                                padding: "16px 32px",
                                                borderTop: "1px solid #e2e8f0",
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: "12px",
                                                    color: "#64748b",
                                                    textAlign: "center" as const,
                                                }}>
                                                    This is an automated notification from consumerlawflorida.com
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    )
}

export default OfficeNotificationEmail
