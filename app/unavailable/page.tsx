import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Home } from "lucide-react"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"

export const metadata: Metadata = {
    title: "Form Unavailable | Consumer Law Florida",
    description: "This form is currently available to U.S. residents only.",
    robots: {
        index: false,
        follow: false,
    },
}

export default function UnavailablePage() {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Form Unavailable
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        This form is currently available to U.S. residents only.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <p className="text-gray-700">
                        If you are a U.S. resident and believe you are seeing this message in error, please contact us directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={`tel:${PRIMARY_PHONE_E164}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            Call {PRIMARY_PHONE}
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 font-semibold transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

