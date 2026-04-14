// Server Component — Pure CSS animated phone mockup
// Shows a mock text thread (STOP → ignored) — SSR rendered, bot readable
// Accessible via aria-label; animation via CSS only (no "use client" required)

interface PhoneMessage {
  text: string
  side: "left" | "right"
  highlight?: boolean
  timestamp?: string
}

interface PhoneMockupProps {
  messages: PhoneMessage[]
  senderName: string
  title?: string
  subtitle?: string
}

export function PhoneMockup({ messages, senderName, title, subtitle }: PhoneMockupProps) {
  return (
    <section className="py-4">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[#002b60] font-[var(--font-playfair-display)] mb-2">
          {title}
        </h2>
      )}
      {subtitle && <p className="text-gray-600 text-sm mb-6">{subtitle}</p>}

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Phone shell */}
        <div
          className="mx-auto sm:mx-0 w-64 flex-shrink-0 animate-fade-up"
          role="img"
          aria-label={`Example text thread with ${senderName} showing STOP request being ignored`}
        >
          {/* Phone frame */}
          <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl ring-4 ring-gray-800">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10" aria-hidden="true" />
            {/* Screen */}
            <div className="bg-gray-50 rounded-[2rem] overflow-hidden">
              {/* Status bar */}
              <div className="bg-white px-4 pt-7 pb-2 flex items-center justify-between border-b border-gray-100" aria-hidden="true">
                <span className="text-xs font-semibold text-gray-800">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1.5 bg-gray-800 rounded-sm" />
                  <div className="w-1 h-1.5 bg-gray-800 rounded-sm" />
                  <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm" />
                </div>
              </div>
              {/* Chat header */}
              <div className="bg-white px-3 py-2 border-b border-gray-100 text-center" aria-hidden="true">
                <p className="text-xs font-bold text-gray-900 truncate">{senderName}</p>
                <p className="text-[10px] text-gray-400">Short Code</p>
              </div>
              {/* Messages — all rendered server-side */}
              <div className="p-3 space-y-2 min-h-[280px] bg-gray-50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"} animate-fade-up`}
                    style={{ animationDelay: `${i * 150 + 200}ms` }}
                  >
                    <div
                      className={`
                        max-w-[78%] px-3 py-2 rounded-2xl text-[11px] leading-snug shadow-sm
                        ${msg.side === "right"
                          ? msg.highlight
                            ? "bg-blue-600 text-white font-bold rounded-br-sm"
                            : "bg-blue-500 text-white rounded-br-sm"
                          : msg.highlight
                            ? "bg-red-100 text-red-800 font-semibold border border-red-300 rounded-bl-sm"
                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                        }
                      `}
                    >
                      {msg.text}
                      {msg.timestamp && (
                        <span className={`block text-[9px] mt-0.5 ${msg.side === "right" ? "text-blue-200" : "text-gray-400"}`}>
                          {msg.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Caption */}
          <p className="text-center text-xs text-gray-500 mt-3 font-medium">Example thread — evidence to screenshot</p>
        </div>

        {/* Annotation callouts — rendered server-side */}
        <div className="flex-1 space-y-4 pt-4">
          {messages.filter(m => m.highlight).map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl border animate-slide-in ${
                msg.side === "right"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-red-50 border-red-200"
              }`}
              style={{ animationDelay: `${i * 200 + 400}ms` }}
            >
              <div
                className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${msg.side === "right" ? "bg-blue-600" : "bg-red-500"}`}
                aria-hidden="true"
              >
                {msg.side === "right" ? "✓" : "!"}
              </div>
              <div>
                <p className={`text-sm font-bold ${msg.side === "right" ? "text-blue-800" : "text-red-800"}`}>
                  {msg.side === "right" ? "Your opt-out (legally recognized)" : "Violation — each one is worth $500–$1,500"}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {msg.side === "right"
                    ? "Texting STOP is a valid, FCC-recognized revocation of consent under the TCPA."
                    : "Every text received after your STOP is a separate federal violation."}
                </p>
              </div>
            </div>
          ))}
          <div className="bg-[#252932] border border-white/10 rounded-xl p-4 animate-slide-in" style={{ animationDelay: "700ms" }}>
            <p className="text-sm font-bold text-white">Screenshot this NOW</p>
            <p className="text-xs text-blue-200 mt-1">This thread is your primary evidence. Screenshots should show the sender number, your STOP message, the date sent, and every text received after.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
