import AvatarGroup from "@/components/avatar-group";
import { ContactForm } from "@/components/contact-form";
import ContactFormSection from "@/components/ui/contact-form-section";
import HeroBarTrans from "@/components/hero-bar-trans";
import StoriesScroller from "@/components/stories";
import Stories from "@/components/stories";
import { Avatar } from "@/components/ui/avatar";
import CaseResults from "@/components/ui/case-results";
import ConsumerLaws from "@/components/ui/consumer-laws";
import Footer from "@/components/ui/footer";
import { Marquee } from "@/components/ui/marquee";
import ProfileCard from "@/components/ui/profile-card";
import Image from "next/image";
// [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem),linear-gradient(to_bottom,transparent,black_6rem),linear-gradient(to_top,transparent,black_6rem)]
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-white dark:bg-black sm:items-center">
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: "url('/miamicity.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative w-full min-h-screen overflow-hidden">
          {/* Background Video */}
          {/* <video
            className="absolute inset-0 size-full object-cover"
            src="/herovideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          /> */}

          {/* Overlay */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(20,20,20,0.55) 80%, transparent 100%)"
            }} */}
          <div
            className="absolute inset-0 h-full min-h-screen"
            style={{
              background: "linear-gradient(to bottom, rgba(30,30,32,0.7) 80%, transparent 120%)"
            }}
          />


          {/* Content */}
          {/* <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center px-6 pt-32 pb-20 text-center md:pt-40">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow sm:text-5xl md:text-6xl">
              Consumer Law Advocates in Florida
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
              Protecting your rights against fraud, unfair practices, and abusive collections.
              Experienced guidance from first call to final resolution.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#consultation"
                className="inline-flex items-center justify-center rounded-xl bg-white/95 px-5 py-3 text-sm font-semibold text-neutral-900 shadow-md shadow-black/20 transition hover:bg-white"
              >
                Free Consultation
              </a>
              <a
                href="#practice-areas"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition hover:bg-white/15"
              >
                Explore Consumer Laws
              </a>
            </div>
          </div> */}
          <section className="flex absolute inset-0 items-center justify-between min-h-screen w-full px-8">
            <div className="w-[50%] py-20">
              <div className="max-w-4xl ">
                {/* Top Stat */}
                <p className="text-lg flex items-center gap-2 sm:text-xl font-semibold uppercase text-sky-600 mb-6 tracking-wider">
                  {/* <AvatarGroup /> Trusted by 10,000+ consumers */}
                  over $30 million recovered for clients
                </p>

                {/* Main Headline */}
                <div className="space-y-2 mb-8">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Big Companies Play Unfair.
                  </h1>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl italic font-bold text-[#007BFF] leading-tight">
                    We Make Them Pay.
                  </h1>
                </div>

                {/* Trust Indicators Marquee */}
                <div className="mb-8 w-full pr-8">
                  <Marquee className="backdrop-blur-sm rounded-lg py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)]" pauseOnHover={true}>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>4.9/5 from 500+ reviews</span>
                    </div>
                    <p className="text-white">•</p>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>$30M+ recovered for clients</span>
                    </div>
                    <p className="text-white">•</p>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>Available 24/7</span>
                    </div>
                    <p className="text-white">•</p>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>No fees unless we win</span>
                    </div>
                    <p className="text-white">•</p>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>Confidential consultations</span>
                    </div>
                    <p className="text-white">•</p>
                  </Marquee>

                </div>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mb-12">
                  Fishetti Law Group recovers what you're owed—compensation, refunds, and justice. You breathe easy while we handle everything.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#consultation"
                    className="inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Free Consultation
                  </a>

                </div>
              </div>
            </div>
            <div className="w-[50%] px-20 relative min-h-screen  items-end justify-center flex">
              <Image src="/fischettiheadshot1.png" alt="Rays Fishetti Headshot" width={750} height={500} className="rounded-xl object-cover" />
              {/* <ContactForm backgroundcolor="white" header="Book an Appointment" buttonText="Book an Appointment" /> */}
            </div>
          </section>

        </section>
        <HeroBarTrans />

        {/* Practice Areas Section */}
        <section id="practice-areas" className="w-full bg-gray-50">
          <div className="max-w-8xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Header and Description */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Our Consumer Law
                    <span className="text-blue-600"> Expertise</span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Fishetti Law Group specializes in protecting consumer rights across seven key areas of federal law.
                    We fight for individuals who have been wronged by unfair business practices, aggressive debt collection,
                    privacy violations, and more.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                      <p className="text-gray-600">
                        Over $30 million recovered for clients through successful settlements and verdicts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-lg">⚖️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Win, No Fee</h3>
                      <p className="text-gray-600">
                        We only get paid when you win. No upfront costs, no hidden fees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-lg">🛡️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Federal Law Specialists</h3>
                      <p className="text-gray-600">
                        Deep expertise in FCRA, FDCPA, TCPA, and other consumer protection statutes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="#consultation"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Your Free Case Review
                  </a>
                </div>
              </div>

              {/* Right Side - Consumer Laws Component */}
              <div className="">
                <ConsumerLaws />
              </div>
            </div>
          </div>
        </section>
        {/* Case Results Section */}
        <CaseResults />



        <div className="my-12">
          <ProfileCard
            headline="A WINNING CONSUMER LAWYER"
            name="Meet Micheal J. Fishetti"
            description="Courtroom warrior from day one
Michael founded Fischetti Law Group in 2016 after years of watching big firms prioritize profits over people. His philosophy? Listen first, fight hard, communicate always. Whether you're facing fraud, deceptive business practices, or corporate misconduct, Michael brings the same aggressive advocacy he learned defending clients in packed courtrooms—except now, he's fighting to get YOU paid."
            primaryButtonText="Book a consultation"
            secondaryButtonText="View Profile"
            accentColor="blue"
            imageUrl="/fischettiheadshots.jpg"
            imageAlt="Micheal Fischetti Headshot"
            affiliations={[
              { name: "The Florida Bar", logo: "/floridabar.png" },
              { name: "American Trial Lawyers Association", logo: "/atla.png" },
              { name: 'Elite Trial Lawyers', logo: "/elite-lawyer.png" }
            ]}
          />
        </div>

        <div className="w-full "><StoriesScroller />        </div>
        {/* Contact Form Section */}
        <ContactFormSection />
      </main>


    </div>
  );
}
