import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, Scale, FileText, Phone, ArrowRight, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "404 - Page Not Found | Fischetti Law Group",
    description: "The page you're looking for doesn't exist. Navigate back to our homepage, explore our consumer law services, or contact us for a free consultation.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto">
                <div className="text-center">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <Link href="/" className="relative h-16 w-64 transition-opacity hover:opacity-80">
                            <Image
                                src="/fischettilogo.png"
                                alt="Fischetti Law Group"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* 404 Heading */}
                    <div className="mb-6">
                        <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
                            404
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-[--font-playfair-display]">
                            Page Not Found
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            The page you're looking for doesn't exist or has been moved.
                            Let us help you find what you need.
                        </p>
                    </div>

                    {/* Navigation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 mb-8 max-w-3xl mx-auto">
                        <Link
                            href="/"
                            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-blue-500/50 transition-all duration-300 text-left"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <Home className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        Return Home
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Go back to our homepage to explore our services
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>

                        <Link
                            href="/#consumer-law"
                            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-blue-500/50 transition-all duration-300 text-left"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <Scale className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        Consumer Laws
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Learn about FCRA, FDCPA, TCPA, and more
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>

                        <Link
                            href="/#consultation"
                            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-blue-500/50 transition-all duration-300 text-left"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <FileText className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        Free Consultation
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Get a free case review from our legal team
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>

                        <a
                            href="tel:8336453247"
                            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-blue-500/50 transition-all duration-300 text-left"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <Phone className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        Call Us Now
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        (833) 645-3247 - Available 24/7
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </a>
                    </div>

                    {/* Primary CTA */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl"
                        >
                            Go to Homepage
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/#consultation"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-md ring-1 ring-gray-200 hover:ring-blue-500/50 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Search className="h-5 w-5" />
                            Find What You Need
                        </Link>
                    </div>

                    {/* Additional Help Text */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 max-w-xl mx-auto">
                            If you believe this is an error, please{" "}
                            <a
                                href="tel:8336453247"
                                className="text-blue-600 hover:text-blue-700 font-medium underline"
                            >
                                contact us
                            </a>
                            {" "}or visit our{" "}
                            <Link
                                href="/"
                                className="text-blue-600 hover:text-blue-700 font-medium underline"
                            >
                                homepage
                            </Link>
                            {" "}to find the information you're looking for.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

