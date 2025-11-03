import fs from "node:fs"
import path from "node:path"
import Link from "next/link"

function readLaws() {
    const p = path.join(process.cwd(), "data", "consumer-laws.json")
    const raw = fs.readFileSync(p, "utf-8")
    return JSON.parse(raw) as Array<{ slug: string; title: string; summary: string }>
}

export default function ConsumerLawIndex() {
    const laws = readLaws()
    return (
        <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">
            <h1 className="text-4xl md:text-5xl font-[--font-playfair-display] text-gray-900 mb-6">Consumer Law</h1>
            <p className="text-lg text-gray-700 mb-10 max-w-3xl">Learn your rights and options under key federal and state consumer protection laws. Explore detailed guides below.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {laws.map((l) => (
                    <Link key={l.slug} href={`/consumer-law/${l.slug}`} className="rounded-2xl border p-6 bg-white hover:shadow-md transition">
                        <h2 className="text-xl font-semibold text-gray-900">{l.title}</h2>
                        <p className="mt-2 text-gray-700 text-sm leading-relaxed line-clamp-4">{l.summary}</p>
                        <span className="mt-3 inline-block text-blue-600 text-sm font-semibold">Read more →</span>
                    </Link>
                ))}
            </div>
        </main>
    )
}


