"use client"

import { useState } from "react"
import { type LawType, calculateDeadline } from "@/lib/email-utils"

type Tab = { type: LawType; label: string; accent: string; caseRef: string; firstName: string; lastName: string }

const TABS: Tab[] = [
    { type: "FCRA",  label: "FCRA",  accent: "#1265eb", caseRef: "CLF-FCRA-TEST-001",  firstName: "Jane",  lastName: "Consumer" },
    { type: "FDCPA", label: "FDCPA", accent: "#0891b2", caseRef: "CLF-FDCPA-TEST-001", firstName: "John",  lastName: "Consumer" },
    { type: "TCPA",  label: "TCPA",  accent: "#dc2626", caseRef: "CLF-TCPA-TEST-001",  firstName: "Maria", lastName: "Consumer" },
    { type: "OTHER", label: "Other", accent: "#475569", caseRef: "CLF-OTHER-TEST-001", firstName: "Alex",  lastName: "Consumer" },
]

const SUBJECTS: Record<LawType, string> = {
    FCRA:  "Your FCRA Case Checklist — Documents to Gather",
    FDCPA: "Your FDCPA Case Checklist — Evidence to Collect",
    TCPA:  "Your TCPA Case Checklist — What to Save Now",
    OTHER: "Your Consumer Law Case Checklist",
}

// Computed once at module load — dev tool only, hydration mismatch is acceptable
const DEADLINE_DATE = calculateDeadline(5)
const SUBMITTED_AT = new Intl.DateTimeFormat("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short", timeZone: "America/New_York",
}).format(new Date())

export function EmailPreviewClient() {
    const [active, setActive] = useState<LawType>("FCRA")
    const [width, setWidth] = useState<"desktop" | "mobile">("desktop")

    const tab = TABS.find((t) => t.type === active)!

    const iframeUrl = `/api/dev/email-preview?type=${active}&name=${encodeURIComponent(tab.firstName)}&last=${encodeURIComponent(tab.lastName)}&ref=${encodeURIComponent(tab.caseRef)}&deadline=${encodeURIComponent(DEADLINE_DATE)}&submitted=${encodeURIComponent(SUBMITTED_AT)}`

    const containerPx = width === "desktop" ? 700 : 390

    return (
        <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0" }}>

            {/* ── SIDEBAR ── */}
            <aside style={{
                width: "280px",
                flexShrink: 0,
                backgroundColor: "#1e293b",
                borderRight: "1px solid #334155",
                display: "flex",
                flexDirection: "column",
            }}>
                {/* Header */}
                <div style={{ padding: "20px", borderBottom: "1px solid #334155" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block" }} />
                        <span style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase" as const }}>
                            Dev Only
                        </span>
                    </div>
                    <h1 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "700", color: "#f1f5f9" }}>
                        Email Preview
                    </h1>
                    <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: "1.5" }}>
                        Development only. Renders local sample data. Does not send emails.
                    </p>
                </div>

                {/* Variant tabs */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #334155" }}>
                    <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" as const }}>
                        Email Variant
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
                        {TABS.map((t) => (
                            <button
                                key={t.type}
                                onClick={() => setActive(t.type)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 12px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left" as const,
                                    backgroundColor: active === t.type ? "#0f172a" : "transparent",
                                    outline: active === t.type ? `2px solid ${t.accent}` : "2px solid transparent",
                                    transition: "all 0.15s",
                                    color: active === t.type ? "#f1f5f9" : "#94a3b8",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: t.accent, flexShrink: 0, display: "inline-block" }} />
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sample data summary */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #334155" }}>
                    <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" as const }}>
                        Sample Data
                    </p>
                    {[
                        ["Name", `${tab.firstName} ${tab.lastName}`],
                        ["Ref", tab.caseRef],
                        ["Reply By", DEADLINE_DATE],
                    ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontSize: "11px", color: "#475569" }}>{k}</span>
                            <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" }}>{v}</span>
                        </div>
                    ))}
                </div>

                {/* Width toggle */}
                <div style={{ padding: "16px 20px" }}>
                    <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" as const }}>
                        Preview Width
                    </p>
                    <div style={{ display: "flex", gap: "6px" }}>
                        {(["desktop", "mobile"] as const).map((w) => (
                            <button
                                key={w}
                                onClick={() => setWidth(w)}
                                style={{
                                    flex: 1,
                                    padding: "8px 0",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    backgroundColor: width === w ? "#3b82f6" : "#0f172a",
                                    color: width === w ? "#ffffff" : "#64748b",
                                    transition: "all 0.15s",
                                }}
                            >
                                {w === "desktop" ? "Desktop" : "Mobile"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Open in new tab */}
                {iframeUrl && (
                    <div style={{ padding: "0 20px 20px", marginTop: "auto" }}>
                        <a
                            href={iframeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "block",
                                textAlign: "center" as const,
                                padding: "9px",
                                borderRadius: "5px",
                                border: "1px solid #334155",
                                fontSize: "12px",
                                color: "#94a3b8",
                                textDecoration: "none",
                                backgroundColor: "#0f172a",
                            }}
                        >
                            Open raw HTML ↗
                        </a>
                    </div>
                )}
            </aside>

            {/* ── PREVIEW AREA ── */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden" }}>
                {/* Top bar */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 24px",
                    borderBottom: "1px solid #1e293b",
                    backgroundColor: "#0f172a",
                    flexShrink: 0,
                    gap: "12px",
                    flexWrap: "wrap" as const,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: tab.accent, display: "inline-block" }} />
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#f1f5f9" }}>
                            {tab.label} Qualification Email
                        </span>
                    </div>
                    <span style={{
                        fontSize: "11px",
                        color: "#64748b",
                        backgroundColor: "#1e293b",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                        maxWidth: "60%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap" as const,
                    }}>
                        Subject: {SUBJECTS[active]}
                    </span>
                </div>

                {/* Iframe */}
                <div style={{
                    flex: 1,
                    overflowY: "auto",
                    backgroundColor: "#1e293b",
                    display: "flex",
                    justifyContent: "center",
                    padding: "32px 24px",
                }}>
                    <div style={{
                        width: `${containerPx}px`,
                        maxWidth: "100%",
                        flexShrink: 0,
                        transition: "width 0.2s ease",
                    }}>
                        {iframeUrl ? (
                            <iframe
                                key={`${active}-${width}`}
                                src={iframeUrl}
                                title={`${active} email preview`}
                                style={{
                                    width: "100%",
                                    height: "1100px",
                                    border: "none",
                                    borderRadius: "6px",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                                    backgroundColor: "#ffffff",
                                }}
                                sandbox="allow-same-origin"
                            />
                        ) : null}
                    </div>
                </div>
            </main>
        </div>
    )
}
