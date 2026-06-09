"use client"

import { useState, useMemo } from "react"
import { generateCaseRef, calculateDeadline } from "@/lib/email-utils"

type LawType = "FCRA" | "FDCPA" | "TCPA" | "OTHER"
type Width = "desktop" | "mobile"

const LAW_TABS: { type: LawType; label: string; accent: string; description: string }[] = [
    {
        type: "FCRA",
        label: "FCRA",
        accent: "#1265eb",
        description: "Credit Report Errors — asks for credit report + bureau dispute response",
    },
    {
        type: "FDCPA",
        label: "FDCPA",
        accent: "#0891b2",
        description: "Debt Collector Harassment — asks for collector name, number, and description",
    },
    {
        type: "TCPA",
        label: "TCPA",
        accent: "#dc2626",
        description: "Robocall / Spam Texts — asks for company name + DNC registry status",
    },
    {
        type: "OTHER",
        label: "Other",
        accent: "#475569",
        description: "General fallback — asks for description + any relevant dates",
    },
]

const DEFAULT_CASE_REF = generateCaseRef()
const DEFAULT_DEADLINE = calculateDeadline(5)
const DEFAULT_SUBMITTED = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/New_York",
}).format(new Date())

const CONTAINER_WIDTHS: Record<Width, { px: number; label: string }> = {
    desktop: { px: 700, label: "Desktop (700px)" },
    mobile: { px: 390, label: "Mobile (390px)" },
}

export function EmailPreviewClient() {
    const [lawType, setLawType] = useState<LawType>("FCRA")
    const [firstName, setFirstName] = useState("Alex")
    const [lastName, setLastName] = useState("Johnson")
    const [caseRef, setCaseRef] = useState(DEFAULT_CASE_REF)
    const [deadline, setDeadline] = useState(DEFAULT_DEADLINE)
    const [submitted, setSubmitted] = useState(DEFAULT_SUBMITTED)
    const [viewWidth, setViewWidth] = useState<Width>("desktop")
    const [iframeKey, setIframeKey] = useState(0) // forces iframe reload on param change

    const previewUrl = useMemo(() => {
        const params = new URLSearchParams({
            type: lawType,
            name: firstName,
            last: lastName,
            ref: caseRef,
            deadline,
            submitted,
        })
        return `/api/dev/email-preview?${params.toString()}`
    }, [lawType, firstName, lastName, caseRef, deadline, submitted])

    const activeTab = LAW_TABS.find((t) => t.type === lawType)!
    const containerWidth = CONTAINER_WIDTHS[viewWidth].px

    function resetRef() {
        setCaseRef(generateCaseRef())
        setIframeKey((k) => k + 1)
    }

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0" }}>

            {/* ── SIDEBAR ── */}
            <aside style={{
                width: "300px",
                flexShrink: 0,
                backgroundColor: "#1e293b",
                borderRight: "1px solid #334155",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
            }}>
                {/* Header */}
                <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #334155" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#22c55e",
                            flexShrink: 0,
                        }} />
                        <span style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase" }}>
                            Dev Only
                        </span>
                    </div>
                    <h1 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#f1f5f9" }}>
                        Email Preview
                    </h1>
                    <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
                        Qualification email templates — not visible in production
                    </p>
                </div>

                {/* Law Type Tabs */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #334155" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "10px" }}>
                        Law Type
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {LAW_TABS.map((tab) => (
                            <button
                                key={tab.type}
                                onClick={() => setLawType(tab.type)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 12px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    backgroundColor: lawType === tab.type ? "#0f172a" : "transparent",
                                    outline: lawType === tab.type ? `2px solid ${tab.accent}` : "2px solid transparent",
                                    transition: "all 0.15s",
                                }}
                            >
                                <span style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "2px",
                                    backgroundColor: tab.accent,
                                    flexShrink: 0,
                                }} />
                                <span>
                                    <span style={{
                                        display: "block",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        color: lawType === tab.type ? "#f1f5f9" : "#94a3b8",
                                    }}>
                                        {tab.label}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                    <p style={{ margin: "10px 0 0", fontSize: "11px", color: "#475569", lineHeight: "1.5" }}>
                        {activeTab.description}
                    </p>
                </div>

                {/* Mock Data Inputs */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #334155", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                        Sample Data
                    </label>

                    <Field
                        label="First Name"
                        value={firstName}
                        onChange={setFirstName}
                        placeholder="Alex"
                    />
                    <Field
                        label="Last Name"
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Johnson"
                    />
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>Case Reference</span>
                            <button
                                onClick={resetRef}
                                style={{
                                    fontSize: "10px",
                                    color: "#3b82f6",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "0",
                                    letterSpacing: "0.3px",
                                }}
                            >
                                Regenerate
                            </button>
                        </div>
                        <input
                            value={caseRef}
                            onChange={(e) => setCaseRef(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <Field
                        label="Deadline Date"
                        value={deadline}
                        onChange={setDeadline}
                        placeholder="Friday, April 25, 2026"
                    />
                    <Field
                        label="Submitted At"
                        value={submitted}
                        onChange={setSubmitted}
                        placeholder="Monday, April 20, 2026 at 2:30 PM EDT"
                    />
                </div>

                {/* Width Toggle */}
                <div style={{ padding: "16px 20px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "10px" }}>
                        Preview Width
                    </label>
                    <div style={{ display: "flex", gap: "6px" }}>
                        {(["desktop", "mobile"] as Width[]).map((w) => (
                            <button
                                key={w}
                                onClick={() => setViewWidth(w)}
                                style={{
                                    flex: 1,
                                    padding: "8px 0",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    backgroundColor: viewWidth === w ? "#3b82f6" : "#0f172a",
                                    color: viewWidth === w ? "#ffffff" : "#64748b",
                                    transition: "all 0.15s",
                                }}
                            >
                                {w === "desktop" ? "Desktop" : "Mobile"}
                            </button>
                        ))}
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: "11px", color: "#475569" }}>
                        {CONTAINER_WIDTHS[viewWidth].label}
                    </p>
                </div>

                {/* Open in new tab link */}
                <div style={{ padding: "0 20px 20px", marginTop: "auto" }}>
                    <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "block",
                            textAlign: "center",
                            padding: "9px",
                            borderRadius: "5px",
                            border: "1px solid #334155",
                            fontSize: "12px",
                            color: "#94a3b8",
                            textDecoration: "none",
                            backgroundColor: "#0f172a",
                        }}
                    >
                        Open in new tab ↗
                    </a>
                </div>
            </aside>

            {/* ── PREVIEW AREA ── */}
            <main style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}>
                {/* Top bar */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 24px",
                    borderBottom: "1px solid #1e293b",
                    backgroundColor: "#0f172a",
                    flexShrink: 0,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "2px",
                            backgroundColor: activeTab.accent,
                        }} />
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#f1f5f9" }}>
                            {activeTab.label} Qualification Email
                        </span>
                        <span style={{
                            fontSize: "11px",
                            color: "#475569",
                            backgroundColor: "#1e293b",
                            padding: "2px 8px",
                            borderRadius: "3px",
                            fontFamily: "monospace",
                        }}>
                            {firstName} / {caseRef}
                        </span>
                    </div>
                    <span style={{ fontSize: "11px", color: "#475569" }}>
                        Subject: Action Required — Your {activeTab.label} Case Review ({caseRef})
                    </span>
                </div>

                {/* Iframe container */}
                <div style={{
                    flex: 1,
                    overflowY: "auto",
                    backgroundColor: "#1e293b",
                    display: "flex",
                    justifyContent: "center",
                    padding: "32px 24px",
                }}>
                    <div style={{
                        width: `${containerWidth}px`,
                        maxWidth: "100%",
                        flexShrink: 0,
                        transition: "width 0.2s ease",
                    }}>
                        <iframe
                            key={`${iframeKey}-${lawType}-${firstName}-${lastName}-${caseRef}-${deadline}-${submitted}`}
                            src={previewUrl}
                            title={`${lawType} email preview`}
                            style={{
                                width: "100%",
                                height: "900px",
                                border: "none",
                                borderRadius: "6px",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                            }}
                            sandbox="allow-same-origin"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Small input field helper
// ---------------------------------------------------------------------------

function Field({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
}) {
    return (
        <div>
            <label style={{ display: "block", fontSize: "11px", color: "#64748b", fontWeight: "500", marginBottom: "6px" }}>
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={inputStyle}
            />
        </div>
    )
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "7px 10px",
    borderRadius: "5px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    fontSize: "12px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
    outline: "none",
}
