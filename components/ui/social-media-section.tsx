"use client";

import Link from "next/link";
import { Facebook } from "@/components/icons/facebook";
import { LinkedIn } from "@/components/icons/linkedin";
import { Instagram } from "@/components/icons/instagram";

interface SocialPlatform {
    name: string;
    icon: React.ElementType;
    url: string;
}

const socialPlatforms: SocialPlatform[] = [
    {
        name: "Facebook",
        icon: Facebook,
        url: "https://www.facebook.com/people/Consumer-Law-Florida/61587398162793/",
    },
    {
        name: "LinkedIn",
        icon: LinkedIn,
        url: "https://www.linkedin.com/company/consumer-law-florida/",
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: "https://www.instagram.com/consumerlawflorida/",
    },
];

export default function SocialMediaSection() {
    return (
        <div className="w-full py-6 px-4 items-end justify-end sm:px-6">
            <div className="">
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6">
                    Follow Us on Our Social
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
                    {socialPlatforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                            <Link
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                            >
                                {/* Logo Container - Rounded square with brand colors */}
                                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                                    <Icon className="w-full h-full" />
                                </div>
                                {/* Platform Name - Centered below logo */}
                                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                    {platform.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
