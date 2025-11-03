"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import Image from "next/image"
import FreeCaseReview from "./free-case-review-button"
import { Phone, Menu, X, Info, Users, MapPin as MapPinIcon, Star, Quote, Shield, FileText, MessageSquareWarning, PhoneCall, Video, Home, Gavel } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import FreeCaseReviewDialog from "./free-case-review-dialog"
import { usePathname, useRouter } from "next/navigation"
import { officeLocations } from "@/data/office-locations"

// Animated Hamburger Icon Component
const HamburgerIcon = ({ open }: { open: boolean }) => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <motion.line
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
        />
        <motion.line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
    </motion.svg>
)

type NavbarProps = {
    className?: string
}

export default function Navbar({ className }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()
    const isHome = pathname === "/"
    const router = useRouter()
    const [openMenu, setOpenMenu] = useState<null | "laws" | "about" | "locations" | "testimonials">(null)
    const hoverTimer = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!isHome) {
            // Non-home pages use dark logo and black text by default
            setScrolled(true)
            return
        }
        const onScroll = () => {
            const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.85 : 0
            setScrolled(window.scrollY > threshold)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [isHome])

    const linkClass = scrolled ? "text-black/90 hover:text-black font-medium text-[15px] leading-[140%] tracking-[-0.15px] hover:opacity-80 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] font-af " : "text-white/90 hover:text-white font-medium text-[15px] leading-[140%] tracking-[-0.15px] hover:opacity-80 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] font-af "
    const toggleSidebar = () => setIsSidebarOpen((v) => !v)
    const closeSidebar = () => setIsSidebarOpen(false)

    // iOS-like sidebar animation variants
    const sidebarVariants = {
        hidden: { x: '-100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }
        },
        exit: { x: '-100%', opacity: 0, transition: { duration: 0.2 } }
    } as const

    const listVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.05 }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    } as const

    function scrollToSection(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) {
        // Smooth scroll if we're already on the homepage; otherwise navigate to the hash
        if (isHome) {
            e.preventDefault()
            const el = document.getElementById(sectionId)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        } else {
            e.preventDefault()
            router.push(`/#${sectionId}`)
        }
    }
    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto z-[112] w-full lg:w-[85%] mx-auto lg:rounded-[12px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[background-color,border-color,box-shadow,backdrop-filter] bg-linear-to-r from-[rgba(249,250,247,0.12)] to-[rgba(249,250,247,0.18)] backdrop-blur-[12px] lg:shadow-[0_2px_6px_0_rgba(0,0,0,0.15)]",
                    className
                )}
                role="navigation"
                aria-label="Primary"
            >
                <div className="flex items-center w-full sm:justify-evenly justify-between  gap-4 px-4 py-2 md:px-6 md:py-3">
                    {/* Brand */}
                    {/* <Link href="/" className="inline-flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white/90 shadow-inner ring-1 ring-inset ring-white/20">
                        <span className="text-lg">Fischetti Law Group</span>
                    </span>
                    <span className="sr-only">Home</span>
                </Link> */}

                    {/* Brand Logo with smooth crossfade and size transition */}
                    <Link href="/" className={cn(
                        "relative overflow-hidden transition-all duration-300 ease-in-out",
                        scrolled ? "h-10 w-52" : "h-12 w-[170px]"
                    )}>
                        {/* Dark-on-light logo */}
                        <Image
                            src="/fischettilogo.png"
                            alt="Fischetti Law Group"
                            fill
                            sizes="(max-width: 768px) 160px, 208px"
                            className={cn("object-cover transition-opacity duration-300 w-52 h-10", scrolled ? "opacity-100" : "opacity-0")}
                            priority
                        />
                        {/* Light-on-dark logo */}
                        <Image
                            src="/fischettiwhite-logo.png"
                            alt="Fischetti Law Group"
                            fill
                            className={cn("object-contain transition-opacity duration-300 ", scrolled ? "opacity-0" : "opacity-100")}
                            aria-hidden={scrolled}
                            priority
                        />
                    </Link>


                    <div className="hidden xl:flex items-center gap-8 text-sm">
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (hoverTimer.current) clearTimeout(hoverTimer.current)
                                setOpenMenu("laws")
                            }}
                            onMouseLeave={() => {
                                if (hoverTimer.current) clearTimeout(hoverTimer.current)
                                hoverTimer.current = setTimeout(() => setOpenMenu(null), 120)
                            }}
                        >
                            <Link href="#consumer-law" onClick={(e) => scrollToSection(e, 'consumer-law')} className={cn(linkClass, "transition-colors text-lg")}>Consumer Laws</Link>
                            <div className={cn(
                                "absolute left-0 top-full mt-3 z-[200] w-100 rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5 transition duration-200",
                                openMenu === "laws" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"
                            )}>
                                <ul className="py-2">
                                    <li>
                                        <Link href="/consumer-law/fcra" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600" /> FCRA — Credit Reporting</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consumer-law/fdcpa" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><MessageSquareWarning className="w-4 h-4 text-blue-600" /> FDCPA — Debt Collection</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consumer-law/tcpa" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-blue-600" /> TCPA — Robocalls & Texts</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consumer-law/privacy" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-600" /> Privacy & Data Breach</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consumer-law/vppa" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><Video className="w-4 h-4 text-blue-600" /> VPPA — Video Privacy</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consumer-law/fha" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-600" /> FHA — Fair Housing</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/consumer-law/mass-arbitration" className="block px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <span className="flex items-center gap-2"><Gavel className="w-4 h-4 text-blue-600" /> Mass Arbitration</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* About dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setOpenMenu("about") }}
                            onMouseLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setOpenMenu(null), 120) }}
                        >
                            <Link href="#about" onClick={(e) => scrollToSection(e, 'about')} className={cn(linkClass, "transition-colors text-lg")}>About</Link>
                            <div className={cn(
                                "absolute left-0 top-full mt-3 z-[200] w-[320px] rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5 transition duration-200",
                                openMenu === "about" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"
                            )}>
                                <ul className="py-2">
                                    <li>
                                        <Link href="/#about" onClick={(e) => scrollToSection(e, 'about')} className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <Info className="w-4 h-4 mt-0.5 text-blue-600" />
                                            <div>
                                                <span className="block font-medium">Who we are</span>
                                                <span className="block text-gray-600 text-[13px]">Values, approach, and mission.</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/#profile" onClick={(e) => scrollToSection(e, 'about')} className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <Users className="w-4 h-4 mt-0.5 text-blue-600" />
                                            <div>
                                                <span className="block font-medium">Meet Michael</span>
                                                <span className="block text-gray-600 text-[13px]">Trial-tested consumer lawyer.</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/#results" onClick={(e) => scrollToSection(e, 'about')} className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <Shield className="w-4 h-4 mt-0.5 text-blue-600" />
                                            <div>
                                                <span className="block font-medium">What we do</span>
                                                <span className="block text-gray-600 text-[13px]">FCRA, FDCPA, TCPA, privacy.</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Locations dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setOpenMenu("locations") }}
                            onMouseLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setOpenMenu(null), 120) }}
                        >
                            <Link href="#locations" onClick={(e) => scrollToSection(e, 'locations')} className={cn(linkClass, "transition-colors text-lg")}>Locations</Link>
                            <div className={cn(
                                "absolute left-0 top-full mt-3 z-[200] w-[320px] rounded-2xl  bg-white/95 shadow-xl ring-1 ring-black/5 transition duration-200",
                                openMenu === "locations" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"
                            )}>
                                <ul className="py-2">
                                    {
                                        officeLocations.map((location) => (
                                            <li key={location.name}>
                                                <Link href="/#locations" onClick={(e) => scrollToSection(e, 'locations')} className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                                    <MapPinIcon className="w-4 h-4 mt-0.5 text-blue-600" />
                                                    <div>
                                                        <span className="block font-medium">{location.name}</span>
                                                        <span className="block text-gray-600 text-sm">{location.address}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                    {/* <li>
                                        <Link href="/#locations" className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <MapPinIcon className="w-4 h-4 mt-0.5 text-blue-600" />
                                            <div>
                                                <span className="block font-medium">Fort Lauderdale</span>
                                                <span className="block text-gray-600 text-[13px]">Consults available 7 days a week.</span>
                                            </div>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>

                        {/* Testimonials dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setOpenMenu("testimonials") }}
                            onMouseLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setOpenMenu(null), 120) }}
                        >
                            <Link href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className={cn(linkClass, "transition-colors text-lg")}>Testimonials</Link>
                            <div className={cn(
                                "absolute left-0 top-full mt-3 z-200 w-[320px] rounded-2xl  bg-white/95 shadow-xl ring-1 ring-black/5 transition duration-200",
                                openMenu === "testimonials" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"
                            )}>
                                <ul className="py-2">
                                    <li>
                                        <Link href="/#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <Star className="w-4 h-4 mt-0.5 text-blue-600" />
                                            <div>
                                                <span className="block font-medium">5/5 Client Reviews</span>
                                                <span className="block text-gray-600 text-[13px]">Hundreds of 5-star experiences.</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="flex items-start gap-3 px-4 py-2.5 text-[15px] text-gray-900 hover:bg-blue-50 rounded-xl mx-1">
                                            <Quote className="w-4 h-4 mt-0.5 text-blue-600" />
                                            <div>
                                                <span className="block font-medium">Client Stories</span>
                                                <span className="block text-gray-600 text-[13px]">Real outcomes, real impact.</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <AnimatedThemeToggler /> */}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={toggleSidebar}
                        aria-label="Toggle menu"
                        aria-expanded={isSidebarOpen}
                        aria-controls="mobile-sidebar"
                        className="xl:hidden relative z-[115] inline-flex items-center justify-center rounded-xl px-3 py-2 ring-1 ring-black/10 bg-white/90 backdrop-blur-sm transition hover:bg-white"
                    >
                        <HamburgerIcon open={isSidebarOpen} />
                    </button>

                    {/* CTA */}
                    <div className="ml-auto sm:ml-0 w-fit sm:flex hidden">
                        {/* <Link
                        href="#consultation"
                        className="inline-flex items-center gap-2 rounded-[12px] bg-blue-600 px-4 py-2 text-[17px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.25)] ring-1 ring-inset ring-blue-500/50 hover:bg-blue-700"
                    >
                        Free Case Review
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/90 text-sm">›</span>
                    </Link> */}
                        <div className="flex items-center gap-4">
                            <FreeCaseReviewDialog><FreeCaseReview className="rounded-full " /></FreeCaseReviewDialog>
                            {/* Divider */}
                            <span className={cn("hidden md:block  h-6 w-px", scrolled ? "bg-black/30" : "bg-white/30")} />
                            {/* Phone */}
                            <a href="tel:8336453247" className={cn(linkClass, "items-center gap-2 md:inline-flex  hidden transition-colors")}>
                                <Phone className="w-5 h-5" />
                                <span>(833) 645-3247</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay (Visible when sidebar is open, below xl) - Outside nav for viewport positioning */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        key="sidebar-overlay"
                        className="fixed inset-0 z-[120] xl:hidden bg-black/50 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container - Outside nav for viewport positioning */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        key="mobile-sidebar"
                        id="mobile-sidebar"
                        className="fixed top-0 left-0 h-screen w-[75%] bg-white rounded-r-2xl shadow-2xl z-[130] xl:hidden overflow-y-auto overscroll-contain"
                        style={{ WebkitOverflowScrolling: 'touch' as any }}
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        aria-hidden={!isSidebarOpen}
                    >
                        {/* Close button at top */}
                        <button
                            onClick={closeSidebar}
                            className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6 text-gray-700" />
                        </button>

                        {/* Sidebar Navigation Links */}
                        <motion.nav
                            className="pt-24 flex flex-col space-y-4 px-6 pb-6 overflow-y-auto"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="#consumer-laws"
                                    onClick={closeSidebar}
                                    className="text-gray-900 text-lg font-semibold hover:text-blue-600 transition-colors block"
                                >
                                    Consumer Laws
                                </Link>
                            </motion.div>

                            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-1 pl-2">
                                <Link href="/consumer-law/fcra" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600" /> FCRA — Credit Reporting</Link>
                                <Link href="/consumer-law/fdcpa" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><MessageSquareWarning className="w-4 h-4 text-blue-600" /> FDCPA — Debt Collection</Link>
                                <Link href="/consumer-law/tcpa" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><PhoneCall className="w-4 h-4 text-blue-600" /> TCPA — Robocalls & Texts</Link>
                                <Link href="/consumer-law/privacy" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><Shield className="w-4 h-4 text-blue-600" /> Privacy & Data Breach</Link>
                                <Link href="/consumer-law/vppa" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><Video className="w-4 h-4 text-blue-600" /> VPPA — Video Privacy</Link>
                                <Link href="/consumer-law/fha" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><Home className="w-4 h-4 text-blue-600" /> FHA — Fair Housing</Link>
                                <Link href="/consumer-law/mass-arbitration" onClick={closeSidebar} className="py-2 text-[15px] text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"><Gavel className="w-4 h-4 text-blue-600" /> Mass Arbitration</Link>
                            </motion.div>

                            {/* About quick links */}
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="#about"
                                    onClick={(e) => { scrollToSection(e, 'about'); closeSidebar() }}
                                    className="text-gray-900 text-lg font-semibold hover:text-blue-600 transition-colors block"
                                >
                                    About
                                </Link>
                                <div className="mt-1 ml-2 grid grid-cols-1 gap-1 text-[14px] text-gray-700">
                                    <Link href="/#about" onClick={closeSidebar} className="py-1 flex items-center gap-2"><Info className="w-4 h-4 text-blue-600" /> Who we are</Link>
                                    <Link href="/#profile" onClick={closeSidebar} className="py-1 flex items-center gap-2"><Users className="w-4 h-4 text-blue-600" /> Meet Michael</Link>
                                </div>
                            </motion.div>

                            {/* Locations quick links */}
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="#locations"
                                    onClick={(e) => { scrollToSection(e, 'locations'); closeSidebar() }}
                                    className="text-gray-900 text-lg font-semibold hover:text-blue-600 transition-colors block"
                                >
                                    Locations
                                </Link>
                                <div className="mt-1 ml-2 grid grid-cols-1 gap-1 text-[14px] text-gray-700">
                                    {
                                        officeLocations.map((location) => (
                                            <Link key={location.name} href={`/#${location.name}`} onClick={closeSidebar} className="py-1 flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-blue-600" /> {location.name} • {location.address} </Link>
                                        ))
                                    }
                                </div>
                            </motion.div>

                            {/* Testimonials quick links */}
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="#testimonials"
                                    onClick={(e) => { scrollToSection(e, 'testimonials'); closeSidebar() }}
                                    className="text-gray-900 text-lg font-semibold hover:text-blue-600 transition-colors block"
                                >
                                    Testimonials
                                </Link>
                                <div className="mt-1 ml-2 grid grid-cols-1 gap-1 text-[14px] text-gray-700">
                                    <Link href="/#testimonials" onClick={closeSidebar} className="py-1 flex items-center gap-2"><Star className="w-4 h-4 text-blue-600" /> 5/5 Reviews</Link>
                                    <Link href="/#testimonials" onClick={closeSidebar} className="py-1 flex items-center gap-2"><Quote className="w-4 h-4 text-blue-600" /> Client stories</Link>
                                </div>
                            </motion.div>

                            <motion.a
                                variants={itemVariants}
                                href="tel:8336453247"
                                className="w-full mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 text-white py-3 font-semibold"
                                onClick={closeSidebar}
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                Call (833) 645-3247
                            </motion.a>
                        </motion.nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    )
}


