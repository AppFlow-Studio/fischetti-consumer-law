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
import LocationsSection from "@/components/ui/locations";
import Testimonials from "@/components/ui/testimonials";
import WhyFischetti from "@/components/ui/why-fischetti";
import Image from "next/image";
import { MorphingText } from "@/components/ui/morphing-text";
import ConsumerLawSection from "@/components/ui/consumer-law-section";
const texts = [
  "Available 24/7.",
  "We Make Them Pay.",
  "No Win, No Fee.",
  "$30M+ Recovered.",
]
// [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem),linear-gradient(to_bottom,transparent,black_6rem),linear-gradient(to_top,transparent,black_6rem)]
export default function Home() {
  return (
    <main className="min-h-full w-full  min-w-screen bg-white justify-center items-center font-sans dark:bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full h-full ">
        <section
          style={{
            backgroundImage: "radial-gradient(circle, #051937, #002b60, #003e8d, #0052bb, #1265eb)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative w-full h-full  min-w-screen lg:pt-0 pt-10 lg:min-h-[840px] xl:min-h-[980px] flex sm:items-end  sm:justify-end  justify-start items-start overflow-visible">
          <div
            className="absolute inset-0 w-full h-full lg:min-h-[840px] xl:min-h-[980px]"
            style={{
              background: "linear-gradient(to bottom, rgba(30,30,32,0.7) 80%, transparent 120%)"
            }}
          />

          <section className="relative flex items-stretch justify-between h-full flex-1 w-full px-4 sm:px-4 lg:px-8 ">
            <div className="w-full lg:w-1/2 sm:pt-12 pt-12 lg:py-12 h-full flex">
              <div className="w-full max-w-4xl xl:max-w-5xl ">
                {/* Top Stat */}
                <p className="text-sm md:text-base xl:text-xl flex items-center gap-2  font-semibold uppercase text-sky-600 mb-2 tracking-wider">
                  {/* <AvatarGroup /> Trusted by 10,000+ consumers */}
                  over <span className="italic">$30 million</span> recovered for clients
                </p>

                {/* Main Headline */}
                <div className="space-y-2 mb-4 xl:mb-8 text-start">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
                    Big Companies Play Unfair.
                  </h1>
                  {/* <h1 className="text-6xl md:text-7xl xl:text-8xl italic font-bold text-[#439cfc] leading-tight">
            We Make Them Pay.
          </h1> */}
                  <div className="rounded-xl text-start items-start justify-start w-full ">
                    <MorphingText texts={texts} className="text-[2rem] md:text-[3rem] xl:text-[4rem] self-start italic font-bold text-[#439cfc]  text-start leading-tight" />
                  </div>
                </div>

                {/* Trust Indicators Marquee */}
                <div className="mb-4 xl:mb-8 w-full pr-8">
                  <Marquee className="backdrop-blur-sm rounded-xl py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)]" pauseOnHover={true}>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>5/5 from 500+ reviews</span>
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
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>15,000+ cases served</span>
                    </div>
                    <p className="text-white">•</p>

                  </Marquee>

                </div>

                {/* Description */}
                <div className="flex sm:flex-row h-full flex-col items-start justify-start  w-full gap-4 lg:max-h-fit sm:max-h-100 max-h-140 lg:mb-4 overflow-hidden">
                  <div className="text-sm sm:text-base xl:text-xl backdrop-blur-sm p-4 rounded-xl text-gray-200 leading-relaxed lg:w-full sm:w-1/2 w-full sm:h-100 h-fit lg:h-fit">
                    <p className=" md:mb-0 sm:mb-12 mb-2 w-full" >
                      Fischetti Law Group is your go-to Florida consumer protection lawyer—trusted, aggressive, and top-rated. We help consumers across Miami, Fort Lauderdale, West Palm Beach, and statewide recover what you're owed under the FDCPA, FCRA, TCPA, and other federal laws. No fees unless we win. Get the best Florida consumer lawyer fighting for you while you breathe easy—we handle everything.
                    </p>
                    <div className="sm:flex flex-col sm:flex-row gap-4 hidden lg:hidden lg:mt-0 mt-12">
                      <a
                        href="#consultation"
                        className="inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-8 py-4 text-xl font-semibold text-white shadow-xl hover:bg-blue-700 transition-colors"
                      >
                        Get Free Consultation
                      </a>
                    </div>
                  </div>
                  {/* <div className="w-full md:w-1/2 sm:h-104 h-80 border border-red-500 relative lg:hidden flex  items-end justify-end sm:mx-auto overflow-hidden">
                    <Image src="/fischettiheadshot5.png" alt="Micheal Fischetti Headshot" fill className="rounded-xl w-full h-full  sm:mt-6 object-[50%_50%] sm:object-cover" priority />
                    <a
                      href="#consultation"
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-6 py-3 text-lg font-semibold text-white shadow-2xl hover:bg-blue-700 transition-colors z-10 w-[80%]"
                    >
                      Get Free Consultation
                    </a>
                  </div> */}
                  <div className="w-full md:w-1/2 sm:h-104 h-80 relative lg:hidden flex  items-end justify-end sm:mx-auto overflow-hidden">
                    <Image
                      src="/fischettiheadshot5.png"
                      alt="Micheal Fischetti Headshot"
                      fill
                      priority
                      className="rounded-xl object-cover object-[50%_25%]"
                    // Try object-[50%_20%] or object-[50%_25%] if 30% is still too low
                    />

                    {/* Button overlay on image for small mobile screens only */}
                    <a
                      href="#consultation"
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-6 py-3 text-lg font-semibold text-white shadow-2xl hover:bg-blue-700 transition-colors z-10 w-[80%]"
                    >
                      Get Free Consultation
                    </a>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex-col sm:flex-row gap-4 lg:flex hidden">
                  <a
                    href="#consultation"
                    className="inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-8 py-4 text-xl font-semibold text-white shadow-xl hover:bg-blue-700 transition-colors"
                  >
                    Get Free Consultation
                  </a>
                </div>
              </div>
            </div>

            <div className="w-0 lg:w-1/2 px-8 xl:px-20 relative hidden lg:block items-end justify-end ">
              <Image src="/fischettiheadshot5.png" alt="Rays Fishetti Headshot" fill className="rounded-xl object-cover object-[50%_33%]" priority />
              {/* <ContactForm backgroundcolor="white" header="Book an Appointment" buttonText="Book an Appointment" /> */}
            </div>
          </section>
        </section>
        <HeroBarTrans />
      </section>


      <div className="max-w-8xl mx-auto">
        <CaseResults />

        {/* Practice Areas Section */}
        {/* <ConsumerLawSection /> */}
        <WhyFischetti />
        {/* Case Results Section */}



        <div className="mb-12 w-full flex flex-col xl:flex-row items-center mt-12 justify-center mx-auto px-4 xl:px-8">
          <ProfileCard
            headline="A WINNING CONSUMER LAWYER"
            name="Meet Micheal J. Fischetti"
            description="Courtroom warrior from day one
  Michael began his career as a defense attorney at the Broward County Public Defender’s Office, where he led busy misdemeanor divisions and tried cases from day one. He later transitioned to civil and consumer litigation, bringing that trial‑tested intensity to fight corporations and collectors on behalf of everyday people.
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


        <LocationsSection />
        <div className="w-full mx-auto pb-22">
          <StoriesScroller />
        </div>

        <ContactFormSection />

        <Testimonials />

      </div>
    </main>
  );
}
