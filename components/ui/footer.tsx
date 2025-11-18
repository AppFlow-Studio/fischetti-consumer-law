"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Twitter,
    Linkedin,
    Instagram
} from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const practiceAreas = [
        { name: "FCRA Violations", href: "#fcra" },
        { name: "FDCPA Defense", href: "#fdcpa" },
        { name: "TCPA Violations", href: "#tcpa" },
        { name: "Privacy & Data Breach", href: "#privacy" },
        { name: "VPPA Violations", href: "#vppa" },
        { name: "Fair Housing Act", href: "#fha" },
        { name: "Mass Arbitration", href: "#arbitration" },
    ]

    const quickLinks = [
        { name: "About Us", href: "#about" },
        { name: "Our Process", href: "#process" },
        { name: "Case Results", href: "#results" },
        { name: "Free Consultation", href: "#consultation" },
        { name: "Contact Us", href: "#contact" },
        { name: "Privacy Policy", href: "/privacy-policy" },
    ]

    const socialLinks = [
        { name: "Facebook", icon: Facebook, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "Instagram", icon: Instagram, href: "#" },
    ]

    return (
        <footer className="text-white border-t border-white/20" style={{ backgroundColor: '#0974a4' }}>
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
                                Fighting for consumer rights across Florida. We recover what you're owed
                                through aggressive advocacy and proven legal strategies.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white">
                                <Phone className="h-4 w-4 text-white" />
                                <span className="text-sm">(833) 645-3247</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <Mail className="h-4 w-4 text-white" />
                                <span className="text-sm">info@fischettilaw.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <MapPin className="h-4 w-4 text-white" />
                                <span className="text-sm">Miami, FL</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <Clock className="h-4 w-4 text-white" />
                                <span className="text-sm">Available 24/7</span>
                            </div>
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Practice Areas</h4>
                        <ul className="space-y-2">
                            {practiceAreas.map((area, index) => (
                                <li key={index}>
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
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
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

                    {/* Newsletter & Social */}
                    <div className="space-y-6">
                        {/* <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
                            <p className="text-white/90 text-sm mb-4">
                                Get the latest consumer law updates and case results.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-sm text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                                />
                                <button className="px-4 py-2 bg-white hover:bg-white/90 text-[#0974a4] rounded-lg text-sm font-medium transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div> */}

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="h-4 w-4 text-white" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-white/80 text-sm">
                            © {currentYear} Fishetti Law Group. All rights reserved.
                        </div>

                        <div className="flex gap-6 text-sm">
                            <Link href="/terms-of-service" className="text-white/80 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
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