"use client";

import { useState, useEffect, useRef } from "react";
import {
    Stories,
    StoriesContent,
    Story,
    StoryAuthor,
    StoryAuthorImage,
    StoryAuthorName,
    StoryOverlay,
    StoryVideo,
} from "@/components/kibo-ui/stories";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,

} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { CarouselApi } from "@/components/ui/carousel";
import SocialMediaSection from "./ui/social-media-section";
const stories = [
    {
        id: 1,
        author: "Micheal Fischetti",
        avatar: "/fischettiheadshots.jpg",
        fallback: "MF",
        video: "/hiding-from-your-debt.mp4",
        title: "Hiding From Your Debt"
    },
    {
        id: 2,
        author: "Micheal Fischetti",
        avatar: "/fischettiheadshots.jpg",
        fallback: "MF",
        video: "/is-debt-destroying-your-life.mp4",
        title: "Is Debt Destroying Your Life?"
    },
    {
        id: 3,
        author: "Micheal Fischetti",
        avatar: "/fischettiheadshots.jpg",
        fallback: "MF",
        video: "/medical-debt.mp4",
        title: "Medical Debt"
    },
    {
        id: 4,
        author: "Micheal Fischetti",
        avatar: "/fischettiheadshots.jpg",
        fallback: "MF",
        video: "/out-to-dinner.mp4",
        title: "Out to Dinner"
    },
    {
        id: 5,
        author: "Micheal Fischetti",
        avatar: "/fischettiheadshots.jpg",
        fallback: "MF",
        video: "/stop-harresing-calls.mp4",
        title: "Stop Harassing Calls"
    },
    {
        id: 6,
        author: "Micheal Fischetti",
        avatar: "/fischettiheadshots.jpg",
        fallback: "MF",
        video: "/debt-collectors-law-violations.mp4",
        title: "Debt Collectors Law Violations"
    },

];


const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
]

const StoriesScroller = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedStory, setSelectedStory] = useState<any>(null);
    const [api, setApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleStoryClick = (story: any) => {
        setSelectedStory(story);
        setSelectedVideo(story.video);
    };

    const closeVideo = () => {
        setSelectedVideo(null);
        setSelectedStory(null);
    };

    // Track carousel scroll position
    useEffect(() => {
        if (!api) {
            return;
        }

        const updateScrollState = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        updateScrollState();
        api.on("select", updateScrollState);
        api.on("reInit", updateScrollState);

        return () => {
            api.off("select", updateScrollState);
            api.off("reInit", updateScrollState);
        };
    }, [api]);

    // Handle mouse wheel scrolling
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !api) {
            return;
        }

        let isScrolling = false;

        const handleWheel = (event: WheelEvent) => {
            // Only handle if event is within the carousel container
            if (!container.contains(event.target as Node)) {
                return;
            }

            // Check if it's primarily horizontal scrolling or shift+scroll
            const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
            const hasSignificantDelta = isHorizontal
                ? Math.abs(event.deltaX) > 10
                : Math.abs(event.deltaY) > 10;

            if (hasSignificantDelta) {
                event.preventDefault();

                // Throttle scroll actions
                if (isScrolling) return;
                isScrolling = true;

                setTimeout(() => {
                    isScrolling = false;
                }, 50);

                if (isHorizontal) {
                    // Horizontal scroll
                    if (event.deltaX > 0 && api.canScrollNext()) {
                        api.scrollNext();
                    } else if (event.deltaX < 0 && api.canScrollPrev()) {
                        api.scrollPrev();
                    }
                } else {
                    // Vertical scroll over carousel - convert to horizontal
                    if (event.deltaY > 0 && api.canScrollNext()) {
                        api.scrollNext();
                    } else if (event.deltaY < 0 && api.canScrollPrev()) {
                        api.scrollPrev();
                    }
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [api]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && selectedVideo) {
                closeVideo();
            }
        };

        if (selectedVideo) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedVideo]);

    return (
        <>
            {/* SEO Header for Short-Form Videos */}
            <div className="w-full max-w-8xl mx-auto px-8 pt-6">
                <h2 className="text-3xl md:text-4xl font-[--font-playfair-display] text-gray-900">
                    Short-Form Guides on Florida Consumer Law
                </h2>
                <p className="mt-3 text-gray-600 max-w-3xl">
                    Watch quick videos from Fischetti Law Group explaining your rights under the FDCPA (debt collection),
                    FCRA (credit reporting), and TCPA (robocalls and texts). Learn how to respond to debt collectors,
                    dispute credit report errors, document violations, and take the first steps toward a successful case—
                    all in under a minute.
                </p>
            </div>

            <div className="w-full max-w-8xl mx-auto px-4">
                <div ref={containerRef} className="relative w-full py-8">
                    <Stories className="w-full" setApi={setApi}>
                        <StoriesContent className="flex flex-row items-center py-2">
                            {stories.map((story) => (
                                <div key={story.id} className="flex flex-col items-center justify-center shrink-0 px-2">
                                    <Story
                                        className="aspect-3/4 w-[200px] cursor-pointer transition-transform"
                                        onClick={() => handleStoryClick(story)}
                                    >
                                        <StoryVideo src={story.video} />
                                        <StoryOverlay />
                                        <StoryAuthor>
                                            <StoryAuthorImage
                                                fallback={story.fallback}
                                                name={story.author}
                                                src={story.avatar}
                                            />
                                            <StoryAuthorName>{story.author}</StoryAuthorName>
                                        </StoryAuthor>
                                    </Story>
                                    <p className="text-sm text-gray-600 mt-2 text-center w-[200px]">{story.title}</p>
                                </div>
                            ))}
                        </StoriesContent>
                    </Stories>

                    {/* Right Scroll Indicator - Shows when can scroll right and not at start */}
                    <AnimatePresence>
                        {canScrollNext && !canScrollPrev && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute right-0 top-0 bottom-0 sm:w-32 w-20 pointer-events-none flex items-center justify-end pr-2 z-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-transparent" />
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10 flex items-center gap-2 text-blue-600"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Both Sides Indicators - Shows when in the middle (can scroll both ways) */}
                    <AnimatePresence>
                        {canScrollNext && canScrollPrev && (
                            <>
                                {/* Left indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute left-0 top-0 bottom-0 sm:w-32 w-20 pointer-events-none flex items-center justify-start pl-2 z-10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
                                    <motion.div
                                        animate={{ x: [0, -5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10 flex items-center gap-2 text-blue-600"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </motion.div>
                                </motion.div>

                                {/* Right indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -right-3 top-0 bottom-0 sm:w-32 w-20 pointer-events-none flex items-center justify-end pr-2 z-10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-transparent" />
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10 flex items-center gap-2 text-blue-600"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Left Scroll Indicator - Shows when can scroll left and at the end */}
                    <AnimatePresence>
                        {canScrollPrev && !canScrollNext && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute -left-3 top-0 bottom-0 sm:w-32 w-20 pointer-events-none flex items-center justify-start pl-2 z-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
                                <motion.div
                                    animate={{ x: [0, -5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10 flex items-center gap-2 text-blue-600"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="w-full max-w-8xl mx-auto px-8 py-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 ">Follow Us on Our Socials</h4>
                <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            className="w-10 h-10 bg-gray-100 hover:bg-blue-600 group rounded-lg flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <social.icon className="h-4 w-4 text-gray-600 group-hover:text-white" />
                        </motion.a>
                    ))}
                </div>
            </div >

            {/* <SocialMediaSection /> */}

            {/* Video Modal */}
            {
                selectedVideo && selectedStory && (
                    <div
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={closeVideo}
                    >
                        <div
                            className="relative w-full max-w-[420px] rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button overlay */}
                            <button
                                onClick={closeVideo}
                                className="absolute z-20 top-2 right-2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Vertical video with overlays */}
                            <div className="group relative aspect-[9/16] bg-black">
                                <video
                                    src={selectedVideo}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-cover"
                                    onEnded={closeVideo}
                                >
                                    Your browser does not support the video tag.
                                </video>

                                {/* Faux play bar to align with hover motion */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/70 to-transparent opacity-100" />

                                {/* Bottom-left meta that nudges up on hover */}
                                <div className="pointer-events-none absolute left-0 right-0 bottom-0 p-3 translate-y-0 group-hover:-translate-y-14 transition-transform duration-100">
                                    <div className="flex flex-col text-white drop-shadow">
                                        <h3 className="text-sm font-semibold">{selectedStory.title}</h3>
                                        <p className="text-xs text-white/85">by {selectedStory.author}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default StoriesScroller;
