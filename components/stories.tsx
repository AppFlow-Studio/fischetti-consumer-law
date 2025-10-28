"use client";

import { useState, useEffect } from "react";
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
import { X, Play } from "lucide-react";

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
    }
];

const StoriesScroller = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedStory, setSelectedStory] = useState<any>(null);

    const handleStoryClick = (story: any) => {
        setSelectedStory(story);
        setSelectedVideo(story.video);
    };

    const closeVideo = () => {
        setSelectedVideo(null);
        setSelectedStory(null);
    };

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
            <Stories className="w-full py-8">
                <StoriesContent className="w-full justify-evenly mx-auto flex flex-row items-center py-2">
                    {stories.map((story) => (
                        <Story
                            className="aspect-3/4 w-[200px] cursor-pointer  transition-transform"
                            key={story.id}
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
                    ))}
                </StoriesContent>
            </Stories>

            {/* Video Modal */}
            {selectedVideo && selectedStory && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closeVideo}
                >
                    <div
                        className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedStory.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    by {selectedStory.author}
                                </p>
                            </div>
                            <button
                                onClick={closeVideo}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Video Player */}
                        <div className="relative aspect-video bg-black">
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                                onEnded={closeVideo}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 border-t">
                            <p className="text-sm text-gray-600 text-center">
                                Click outside the video or press ESC to close
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StoriesScroller;
