// import AvatarGroup from "@/components/avatar-group";
// import { ContactForm } from "@/components/contact-form";
import ContactFormSection from "@/components/ui/contact-form-section";
import HeroBarTrans from "@/components/hero-bar-trans";
import StoriesScroller from "@/components/stories";
// import Stories from "@/components/stories";
// import { Avatar } from "@/components/ui/avatar";
import CaseResults from "@/components/ui/case-results";
import CaseResultsCards from "@/components/ui/case-results-cards";
// import ConsumerLaws from "@/components/ui/consumer-laws";
// import Footer from "@/components/ui/footer";
import { Marquee } from "@/components/ui/marquee";
import ProfileCard from "@/components/ui/profile-card";
import LocationsSection from "@/components/ui/locations";
import Testimonials from "@/components/ui/testimonials";
import WhyFischetti from "@/components/ui/why-fischetti";
import Image from "next/image";
import { MorphingText } from "@/components/ui/morphing-text";
// import ConsumerLawSection from "@/components/ui/consumer-law-section"
import SeoInsightBlock from "@/components/sections/SeoInsightBlock";
import type { Metadata } from "next"
import { buildPageMeta } from "@/lib/seo"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = buildPageMeta({
  title: "Florida Consumer Protection Attorney | FDCPA, TCPA & FCRA Lawyer",
  description: "Florida consumer protection attorney fighting debt collector harassment, robocalls, spam texts, and credit report errors. No fees unless we win.",
  canonical: "https://www.consumerlawflorida.com",
  keywords: [
    "fdcpa lawyer florida",
    "tcpa lawyer florida",
    "debt collector harassment attorney",
    "robocall lawyer florida",
    "consumer protection attorney florida",
    "fcra attorney florida",
    "consumer law attorney florida",
    "spam text lawyer florida",
    "credit report error attorney florida",
  ],
})

const homepageFaqs = [
  {
    question: "What is a consumer protection lawyer?",
    answer: "A consumer protection lawyer represents individuals whose rights have been violated by companies under federal laws like the FDCPA, TCPA, and FCRA. These laws give consumers the right to sue companies that harass them, call them illegally, or damage their credit — and to recover money damages, often without paying any attorney fees.",
  },
  {
    question: "How do I know if a debt collector is breaking the law?",
    answer: "Common signs include: calling repeatedly or at unusual hours (before 8 AM or after 9 PM), threatening arrest or legal action they can't take, calling after you told them to stop, contacting your employer, or using abusive language. Under the FDCPA, each of these may be a violation worth up to $1,000.",
  },
  {
    question: "What is the TCPA?",
    answer: "The Telephone Consumer Protection Act (TCPA) is a federal law that restricts automated calls, prerecorded messages, and spam texts to cell phones. Companies that call or text you without consent — or after you revoke consent — may owe you $500 to $1,500 per call or text under this law.",
  },
  {
    question: "How much can I recover from an illegal robocall?",
    answer: "Each illegal robocall or spam text can be worth $500 to $1,500 under the TCPA. If you received 10 illegal calls, you may be entitled to up to $15,000. You do not need to prove financial harm — the law provides statutory damages specifically for this purpose.",
  },
  {
    question: "Do I need a lawyer to sue a debt collector?",
    answer: "While you can file an FDCPA claim on your own, having an attorney dramatically improves your outcome and costs you nothing if we don't win. The FDCPA requires the defendant to pay your attorney's fees if you prevail, meaning Consumer Law Florida typically costs you nothing out of pocket.",
  },
]

// AggregateRating is already on the #legal-service entity in layout.tsx — no duplicate needed here.

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
                  <div className="rounded-xl text-start items-start justify-start w-full relative">
                    <MorphingText texts={texts} className="text-[2rem] md:text-[3rem] xl:text-[4rem] self-start italic font-bold text-[#439cfc] text-start leading-tight" />
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
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-medium px-4">
                      <span>Stopping harassment in its tracks.</span>
                    </div>
                    <p className="text-white">•</p>
                  </Marquee>

                </div>

                {/* Description */}
                <div className="flex sm:flex-row h-full flex-col items-start justify-start  w-full gap-4 lg:max-h-fit sm:max-h-100 max-h-140 lg:mb-4 overflow-hidden">
                  <div className="text-sm sm:text-base xl:text-xl backdrop-blur-sm sm:p-4 rounded-xl text-gray-200 leading-relaxed lg:w-full sm:w-1/2 w-full sm:h-100 h-fit lg:h-fit">
                    <p className="md:mb-0 sm:mb-12 mb-2 w-full">
                      Debt collectors, robocalls, credit report errors — we sue the companies responsible under the{" "}
                      <a href="/consumer-law/fdcpa/debt-collector-keeps-calling" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">
                        FDCPA
                      </a>
                      ,{" "}
                      <a href="/consumer-law/tcpa/robocall-lawsuit-florida" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">
                        TCPA
                      </a>
                      , and FCRA. Serving all of Florida. No fees unless we win.
                    </p>
                    <div className="sm:flex flex-col sm:flex-row gap-4 hidden lg:hidden lg:mt-0 mt-12">
                      <a
                        href="#case-review-form"
                        className="inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-8 py-4 text-xl font-semibold text-white shadow-xl hover:bg-blue-700 transition-colors"
                      >
                        Get a Free Case Review Now
                      </a>
                    </div>
                  </div>
                  {/* <div className="w-full md:w-1/2 sm:h-104 h-80 border border-red-500 relative lg:hidden flex  items-end justify-end sm:mx-auto overflow-hidden">
                    <Image src="/fischettiheadshot5.png" alt="Michael J. Fischetti — Florida Consumer Protection Attorney" fill className="rounded-xl w-full h-full  sm:mt-6 object-[50%_50%] sm:object-cover" priority />
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
                      alt="Michael J. Fischetti, Consumer Law Florida Attorney"
                      fill
                      priority
                      className="rounded-xl object-cover object-[50%_25%]"
                    />

                    {/* Button overlay on image for small mobile screens only */}
                    <a
                      href="#case-review-form"
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-6 py-3 text-lg font-semibold text-white shadow-2xl hover:bg-blue-700 transition-colors z-10 w-[80%]"
                    >
                      Get a Free Case Review Now
                    </a>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex-col sm:flex-row gap-4 lg:flex hidden">
                  <a
                    href="#case-review-form"
                    className="inline-flex items-center justify-center rounded-xl bg-[#007BFF] px-8 py-4 text-xl font-semibold text-white shadow-xl hover:bg-blue-700 transition-colors"
                  >
                    Get a Free Case Review Now
                  </a>
                </div>
              </div>
            </div>

            <div className="w-0 lg:w-1/2 px-8 xl:px-20 relative hidden lg:block items-end justify-end ">
              <Image src="/fischettiheadshot5.png" alt="Michael J. Fischetti, Consumer Protection Lawyer Florida" fill className="rounded-xl object-cover object-[50%_25%]" priority />
              {/* <ContactForm backgroundcolor="white" header="Book an Appointment" buttonText="Book an Appointment" /> */}
            </div>
          </section>
        </section>
        <HeroBarTrans />
      </section>

      {/* SEO/CRO Insight Sections */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {/* 1. Why Consumer Protection Laws Exist */}
            <SeoInsightBlock
              variant="policy"
              title="Why Consumer Protection Laws Exist"
              content={{
                text: "Consumer protection laws exist to address the power imbalance between large corporations and individual consumers. These laws prevent abuse, hold companies accountable for unfair practices, and ensure consumers have legal recourse when their rights are violated. Federal statutes like the FCRA, FDCPA, and TCPA provide essential safeguards against deceptive business practices.",
              }}
            />

            {/* 2. Do I Have a Case? */}
            <SeoInsightBlock
              variant="qualification"
              title="Do I Have a Case?"
              content={{
                items: [
                  "Repeated calls or texts after asking them to stop",
                  "Credit report errors not corrected after a dispute",
                  "Background check cost you a job, promotion, or housing",
                  "Debt collectors calling after 9 PM or at your workplace",
                  "False threats of arrest or jail from a debt buyer",
                ],
              }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto">
        {/* Money Cards Section - Separated and moved above video section for CRO */}
        <CaseResultsCards />

        {/* Case Results Section with Header and Video */}
        <CaseResults />

        {/* Trust Badges Section - Moved here for CRO */}
        <WhyFischetti />



        <div className="mb-12 w-full flex flex-col xl:flex-row items-center mt-12 justify-center mx-auto px-4 xl:px-8">
          <ProfileCard
            headline="A WINNING CONSUMER LAWYER"
            name="Meet Michael J. Fischetti"
            description="Courtroom warrior from day one. Michael began his career as a defense attorney at the Broward County Public Defender's Office, where he handled both misdemeanor and felony cases, led busy misdemeanor divisions, and tried cases from day one. He later transitioned to civil and consumer litigation, bringing that trial-tested intensity to fight corporations and collectors on behalf of everyday people. Michael founded Fischetti Law Group after years of watching big firms prioritize profits over people. His philosophy? Listen first, fight hard, communicate always. Whether you're facing fraud, deceptive business practices, or corporate misconduct, Michael brings the same aggressive advocacy he learned defending clients in packed courtrooms—except now, he's fighting to get YOU paid. Recognized for excellence, Michael holds an A+ rating from the Better Business Bureau, a Trust badge for Attorney At Law, and is featured on Elite Lawyer—testaments to his commitment to client success and ethical practice."
            primaryButtonText="Book a consultation"
            secondaryButtonText="View Profile"
            accentColor="blue"
            imageUrl="/fischettiheadshots.jpg"
            imageAlt="Michael J. Fischetti, Consumer Protection Lawyer Florida"
            affiliations={[
              { name: "Better Business Bureau", logo: "/bbba.png" },
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

        {/* FAQ Section — Above Footer for Homepage */}
        <FAQSection faqs={homepageFaqs} title="Consumer Protection Law — Common Questions" />

      </div>
    </main>
  );
}
