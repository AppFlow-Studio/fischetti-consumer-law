import * as React from "react"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"

interface ClientConfirmationEmailProps {
    firstName: string
    lastName: string
    caseType: string
}

export function ClientConfirmationEmail({
    firstName,
    lastName,
    caseType,
}: ClientConfirmationEmailProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>We've Received Your Case - Fischetti Law Group</title>
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                backgroundColor: "#f8fafc",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            }}>
                {/* Wrapper Table */}
                <table
                    role="presentation"
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ backgroundColor: "#f8fafc" }}
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
                                        {/* Header with Logo */}
                                        <tr>
                                            <td
                                                align="center"
                                                style={{
                                                    background: "linear-gradient(135deg, #051937 0%, #1265eb 100%)",
                                                    padding: "32px 40px",
                                                }}
                                            >
                                                <img
                                                    src="https://consumerlawflorida.com/fischettiwhite-logo.png"
                                                    alt="Fischetti Law Group"
                                                    width="220"
                                                    height="auto"
                                                    style={{
                                                        display: "block",
                                                        maxWidth: "220px",
                                                        height: "auto",
                                                    }}
                                                />
                                            </td>
                                        </tr>

                                        {/* Main Content */}
                                        <tr>
                                            <td style={{ padding: "40px" }}>
                                                {/* Greeting */}
                                                <p style={{
                                                    margin: "0 0 24px 0",
                                                    fontSize: "24px",
                                                    fontWeight: "600",
                                                    color: "#0f172a",
                                                    lineHeight: "1.3",
                                                }}>
                                                    {firstName}, we've received your case.
                                                </p>

                                                <p style={{
                                                    margin: "0 0 24px 0",
                                                    fontSize: "16px",
                                                    color: "#475569",
                                                    lineHeight: "1.6",
                                                }}>
                                                    Thank you for contacting Fischetti Law Group regarding your <strong style={{ color: "#1265eb" }}>{caseType}</strong> matter. Your submission has been received and is now under review by our legal team.
                                                </p>

                                                {/* Divider */}
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ padding: "16px 0" }}>
                                                                <div style={{ height: "1px", backgroundColor: "#e2e8f0" }}></div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* What to Expect */}
                                                <p style={{
                                                    margin: "0 0 20px 0",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    color: "#0f172a",
                                                }}>
                                                    What happens next:
                                                </p>

                                                {/* Steps */}
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: "24px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ paddingBottom: "16px" }}>
                                                                <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{ verticalAlign: "top", paddingRight: "16px" }}>
                                                                                <div style={{
                                                                                    width: "28px",
                                                                                    height: "28px",
                                                                                    backgroundColor: "#051937",
                                                                                    borderRadius: "50%",
                                                                                    color: "#ffffff",
                                                                                    fontSize: "14px",
                                                                                    fontWeight: "600",
                                                                                    textAlign: "center" as const,
                                                                                    lineHeight: "28px",
                                                                                }}>
                                                                                    1
                                                                                </div>
                                                                            </td>
                                                                            <td style={{ verticalAlign: "top" }}>
                                                                                <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                                                                                    Case Review
                                                                                </p>
                                                                                <p style={{ margin: 0, fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                                                                                    Our attorneys will review the details you provided.
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ paddingBottom: "16px" }}>
                                                                <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{ verticalAlign: "top", paddingRight: "16px" }}>
                                                                                <div style={{
                                                                                    width: "28px",
                                                                                    height: "28px",
                                                                                    backgroundColor: "#051937",
                                                                                    borderRadius: "50%",
                                                                                    color: "#ffffff",
                                                                                    fontSize: "14px",
                                                                                    fontWeight: "600",
                                                                                    textAlign: "center" as const,
                                                                                    lineHeight: "28px",
                                                                                }}>
                                                                                    2
                                                                                </div>
                                                                            </td>
                                                                            <td style={{ verticalAlign: "top" }}>
                                                                                <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                                                                                    Initial Assessment
                                                                                </p>
                                                                                <p style={{ margin: 0, fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                                                                                    We'll evaluate the merits and potential of your case.
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table role="presentation" cellPadding="0" cellSpacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{ verticalAlign: "top", paddingRight: "16px" }}>
                                                                                <div style={{
                                                                                    width: "28px",
                                                                                    height: "28px",
                                                                                    backgroundColor: "#051937",
                                                                                    borderRadius: "50%",
                                                                                    color: "#ffffff",
                                                                                    fontSize: "14px",
                                                                                    fontWeight: "600",
                                                                                    textAlign: "center" as const,
                                                                                    lineHeight: "28px",
                                                                                }}>
                                                                                    3
                                                                                </div>
                                                                            </td>
                                                                            <td style={{ verticalAlign: "top" }}>
                                                                                <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                                                                                    Personal Contact
                                                                                </p>
                                                                                <p style={{ margin: 0, fontSize: "14px", color: "#64748b", lineHeight: "1.5" }}>
                                                                                    A member of our team will reach out within 24 hours.
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* CTA Box */}
                                                <table
                                                    role="presentation"
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                        backgroundColor: "#f1f5f9",
                                                        borderRadius: "6px",
                                                        marginBottom: "24px",
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ padding: "24px", textAlign: "center" as const }}>
                                                                <p style={{
                                                                    margin: "0 0 12px 0",
                                                                    fontSize: "15px",
                                                                    color: "#475569",
                                                                }}>
                                                                    Need to speak with us immediately?
                                                                </p>
                                                                <a
                                                                    href={`tel:${PRIMARY_PHONE_E164}`}
                                                                    style={{
                                                                        display: "inline-block",
                                                                        fontSize: "20px",
                                                                        fontWeight: "700",
                                                                        color: "#051937",
                                                                        textDecoration: "none",
                                                                    }}
                                                                >
                                                                    {PRIMARY_PHONE}
                                                                </a>
                                                                <p style={{
                                                                    margin: "8px 0 0 0",
                                                                    fontSize: "13px",
                                                                    color: "#64748b",
                                                                }}>
                                                                    Available 24/7
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                {/* Closing */}
                                                <p style={{
                                                    margin: "0 0 8px 0",
                                                    fontSize: "15px",
                                                    color: "#475569",
                                                    lineHeight: "1.6",
                                                }}>
                                                    We appreciate you trusting Fischetti Law Group with your case.
                                                </p>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: "15px",
                                                    color: "#0f172a",
                                                    fontWeight: "500",
                                                }}>
                                                    — The Fischetti Law Group Team
                                                </p>
                                            </td>
                                        </tr>

                                        {/* Footer */}
                                        <tr>
                                            <td style={{
                                                backgroundColor: "#051937",
                                                padding: "24px 40px",
                                            }}>
                                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ textAlign: "center" as const }}>
                                                                <p style={{
                                                                    margin: "0 0 8px 0",
                                                                    fontSize: "13px",
                                                                    color: "#94a3b8",
                                                                }}>
                                                                    7593 Boynton Beach Blvd, Suite 110, Boynton Beach, FL 33437
                                                                </p>
                                                                <p style={{
                                                                    margin: "0 0 16px 0",
                                                                    fontSize: "13px",
                                                                    color: "#94a3b8",
                                                                }}>
                                                                    <a href={`tel:${PRIMARY_PHONE_E164}`} style={{ color: "#94a3b8", textDecoration: "none" }}>{PRIMARY_PHONE}</a>
                                                                    {" · "}
                                                                    <a href="mailto:info@consumerlawflorida.com" style={{ color: "#94a3b8", textDecoration: "none" }}>info@consumerlawflorida.com</a>
                                                                </p>
                                                                <p style={{
                                                                    margin: 0,
                                                                    fontSize: "11px",
                                                                    color: "#64748b",
                                                                    lineHeight: "1.5",
                                                                }}>
                                                                    This email is confidential and intended for the named recipient only. This communication does not constitute legal advice and does not create an attorney-client relationship.
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
            </body>
        </html>
    )
}

export default ClientConfirmationEmail
