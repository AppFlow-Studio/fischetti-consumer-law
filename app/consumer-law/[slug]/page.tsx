import fs from "node:fs"
import path from "node:path"
import ConsumerLawDetails, { ConsumerLawJsonLd } from "@/components/consumer-law-details"
import SimpleContactForm from "@/components/ui/simple-contact-form"
import CaseResults from "@/components/ui/case-results"
import Image from "next/image"
type Law = any

function readLaws(): Law[] {
    const p = path.join(process.cwd(), "data", "consumer-laws.json")
    const raw = fs.readFileSync(p, "utf-8")
    return JSON.parse(raw)
}

export async function generateStaticParams() {
    const laws = readLaws()
    return laws.map((l) => ({ slug: l.slug }))
}

export default async function ConsumerLawDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const laws = readLaws()
    const slug = await params
    const law = laws.find((l) => l.slug === slug.slug)
    console.log(slug.slug)
    if (!law) {
        return null
    }
    const siteUrl = "https://example.com"
    return (
        <div className="w-full overflow-x-hidden">
            <ConsumerLawJsonLd data={law} siteUrl={siteUrl} />
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 pt-24 pb-10 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-x-hidden">
                <aside className="lg:col-span-1 order-last lg:order-first min-w-0">
                    <div className="sticky top-24 w-full">
                        <div className="rounded-2xl  bg-white/90 backdrop-blur p-4 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Free Case Review</h2>
                            <p className="text-sm text-gray-600 mb-4">Tell us about your situation. No fees unless we win.</p>
                            <SimpleContactForm />
                        </div>
                    </div>
                </aside>
                <section className="lg:col-span-3 min-w-0">
                    <div className="flex items-center mb-1 min-w-0">
                        <div className="relative aspect-video w-40 sm:w-52 ml-3 min-w-0">
                            <Image src="/fischettilogo.png" alt="Fischetti Law Group" fill className="object-cover" />
                        </div>
                    </div>
                    <ConsumerLawDetails {...law} />
                </section>
            </div>
            <CaseResults />
        </div>
    )
}


