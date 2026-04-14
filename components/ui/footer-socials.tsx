"use client"

import { motion } from "framer-motion"
import { Facebook, Linkedin, Instagram } from "lucide-react"

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/people/Consumer-Law-Florida/61587398162793/" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/consumer-law-florida/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/consumerlawflorida/" },
]

export default function FooterSocials() {
    return (
        <div className="flex gap-3">
            {socialLinks.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <social.icon className="h-4 w-4 text-white" />
                </motion.a>
            ))}
        </div>
    )
}
