import Link from "next/link"
import Image from "next/image"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
} from "lucide-react"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164, PRIMARY_EMAIL, SITE_NAME } from "@/lib/site"
import FooterSocials from "./footer-socials"
import CookiePreferencesLink from "@/components/consent/CookiePreferencesLink"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const practiceAreas = [
        { name: "FCRA — Credit Report Errors", href: "/consumer-law/fcra" },
        { name: "FDCPA — Debt Collector Harassment", href: "/consumer-law/fdcpa" },
        { name: "TCPA — Robocalls & Spam Texts", href: "/consumer-law/tcpa" },
        { name: "Debt Collector Won't Stop Calling", href: "/consumer-law/fdcpa/debt-collector-keeps-calling" },
        { name: "Debt Collector Called After 9 PM", href: "/consumer-law/fdcpa/debt-collector-called-after-9pm" },
        { name: "Illegal Robocall Lawsuit Florida", href: "/consumer-law/tcpa/robocall-lawsuit-florida" },
        { name: "Spam Text Lawsuit Florida", href: "/consumer-law/tcpa/spam-texts-florida" },
    ]

    const quickLinks = [
        { name: "About Us", href: "/#about" },
        { name: "Case Results", href: "/#results" },
        { name: "Our Offices", href: "/#locations" },
        { name: "Free Case Review", href: "/free-case-review" },
        { name: "FAQs", href: "/faqs" },
        { name: "Privacy Policy", href: "/privacy-policy" },
    ]

    return (
        <footer className="text-white" style={{ background: 'linear-gradient(to bottom, #051937, #020b16)' }}>
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 sm:py-16 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center relative">
                            <div className="relative w-full lg:h-24 h-32 flex items-start justify-center mb-4">
                                <Image src="/fischettiwhite-logo.png" alt="Fischetti Law Group Logo" fill className="rounded-xl object-fill" />
                            </div>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Fighting for consumer rights across Florida. We recover what you&apos;re owed
                                through aggressive advocacy and proven legal strategies.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white">
                                <Phone className="h-4 w-4 text-white shrink-0" />
                                <a href={`tel:${PRIMARY_PHONE_E164}`} className="text-sm hover:underline">{PRIMARY_PHONE}</a>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <Mail className="h-4 w-4 text-white shrink-0" />
                                <a href={`mailto:${PRIMARY_EMAIL}`} className="text-sm hover:underline">{PRIMARY_EMAIL}</a>
                            </div>
                            <div className="flex items-start gap-3 text-white">
                                <MapPin className="h-4 w-4 text-white mt-0.5 shrink-0" />
                                <span className="text-sm">111 N Orange Ave, Suite 800<br />Orlando, FL 32801</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <Clock className="h-4 w-4 text-white" />
                                <span className="text-sm">Available 24/7</span>
                            </div>
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div className="space-y-6">
                        <p className="text-lg font-semibold text-white">Practice Areas</p>
                        <ul className="space-y-2">
                            {practiceAreas.map((area) => (
                                <li key={area.href}>
                                    <Link
                                        href={area.href}
                                        className="text-white/90 hover:text-white transition-colors text-sm"
                                    >
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <p className="text-lg font-semibold text-white">Quick Links</p>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links — client island for hover animations */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-lg font-semibold text-white mb-4">Follow Us</p>
                            <FooterSocials />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-white/80 text-sm">
                            © {currentYear} {SITE_NAME}. All rights reserved.
                        </div>

                        <div className="flex gap-6 text-sm">
                            <Link href="/terms-of-service" className="text-white/80 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <CookiePreferencesLink className="text-white/80 hover:text-white transition-colors" />
                            <Link href="/legal-disclaimer" className="text-white/80 hover:text-white transition-colors">
                                Legal Disclaimer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
