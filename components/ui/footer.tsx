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
        <footer className="bg-white text-gray-900 border-t border-gray-200 ">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center relative">
                            <div className="relative w-full h-24"><Image src="/fischettilogo.png" alt="Fischetti Law Group Logo" fill className="rounded-xl object-cover mb-4" /></div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Fighting for consumer rights across Florida. We recover what you're owed
                                through aggressive advocacy and proven legal strategies.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">(833) 645-3247</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">info@fischettilaw.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">Miami, FL</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">Available 24/7</span>
                            </div>
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Practice Areas</h4>
                        <ul className="space-y-2">
                            {practiceAreas.map((area, index) => (
                                <li key={index}>
                                    <Link
                                        href={area.href}
                                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                    >
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
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
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Get the latest consumer law updates and case results.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div> */}

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 bg-gray-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="h-4 w-4 text-gray-600 hover:text-white" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-500 text-sm">
                            © {currentYear} Fishetti Law Group. All rights reserved.
                        </div>

                        <div className="flex gap-6 text-sm">
                            <Link href="/terms-of-service" className="text-gray-500 hover:text-blue-600 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/privacy-policy" className="text-gray-500 hover:text-blue-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#disclaimer" className="text-gray-500 hover:text-blue-600 transition-colors">
                                Legal Disclaimer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
    )
}