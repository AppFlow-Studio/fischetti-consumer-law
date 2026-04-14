// No "use client" — this is a server component
import { CTAStripButton } from './cta-strip-button'
import { SITE_CONFIG } from '@/lib/seo'
import { Phone, ArrowRight, ShieldCheck } from "lucide-react"

export function CTAStrip() {
  return (
    <section
      className="relative w-full py-20 lg:py-32 px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle at center, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 shadow-xl">
          <ShieldCheck className="w-4 h-4 text-blue-300" />
          <span className="text-white text-xs font-black uppercase tracking-[0.2em]">
            No Fees Unless We Win
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[var(--font-playfair-display)] leading-tight tracking-tight">
          Federal Law Is On Your Side. <br className="hidden md:block" />
          <span className="text-blue-200">Let Us Hold Them Accountable.</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 mb-12 leading-relaxed font-medium">
          Get a free, no-obligation review of your case. We specialize in holding large companies accountable for consumer law violations—at no out-of-pocket cost to you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <CTAStripButton className="w-full sm:w-auto h-auto py-5 px-10 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 text-lg font-bold shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2" />
          
          <a
            href={SITE_CONFIG.phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-2xl border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold hover:bg-white/10 hover:border-white/50 transition-all text-lg shadow-xl hover:-translate-y-1 gap-2"
          >
            <Phone className="w-5 h-5 text-blue-300" aria-hidden="true" />
            Call {SITE_CONFIG.phone}
          </a>
        </div>
        
        <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-white font-bold text-lg leading-tight">100% Free</p>
            <p className="text-blue-300 text-xs font-black uppercase tracking-widest mt-1">Case Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg leading-tight">No Fees</p>
            <p className="text-blue-300 text-xs font-black uppercase tracking-widest mt-1">Unless We Win</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg leading-tight">24/7</p>
            <p className="text-blue-300 text-xs font-black uppercase tracking-widest mt-1">Availability</p>
          </div>
        </div>
      </div>
    </section>
  )
}
