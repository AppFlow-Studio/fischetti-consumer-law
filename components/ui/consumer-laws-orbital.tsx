"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
    FileText,
    Shield,
    Gavel,
    AlertTriangle,
    CreditCard,
    Bell,
} from "lucide-react";

interface ConsumerLawItem {
    id: number;
    title: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
    slug?: string;
}

interface ConsumerLawsOrbitalProps {
    logo?: string;
    logoSize?: number;
}

interface PracticeArea {
    icon: React.ElementType;
    title: string;
    category: string;
    slug?: string;
    content: string;
}

const practiceAreas: PracticeArea[] = [
    {
        icon: CreditCard,
        title: "FCRA",
        category: "fcra",
        content: "Credit report and background check errors, denials, mixed files, and stubborn bureaus. When Experian, Equifax, or TransUnion mess up your life, we fight back with FCRA violations.",
    },
    {
        icon: Gavel,
        title: "FDCPA",
        category: "fdcpa",
        content: "Harassing calls, false threats, and lawsuits from debt buyers like Midland, Portfolio, or LVNV. We defend against aggressive collection practices and garnishment attempts.",
    },
    {
        icon: Bell,
        title: "TCPA",
        category: "tcpa",
        content: "Robocalls and spam texts without consent, telemarketing violations. We help consumers stop unwanted calls and texts while seeking compensation for TCPA violations.",
    },
    {
        icon: FileText,
        title: "VPPA",
        category: "vppa",
        content: "Apps and publishers leaking viewing history to ad platforms. We protect your video privacy rights when companies improperly share your viewing data.",
    },
    {
        icon: Shield,
        title: "FHA",
        category: "fha",
        content: "Housing discrimination claims and violations. We fight for fair housing rights and hold landlords, property managers, and housing providers accountable.",
    },
    {
        icon: AlertTriangle,
        title: "Mass Arbitration",
        category: "arbitration",
        slug: "mass-arbitration",
        content: "When platforms force arbitration through TOS and you bring hundreds of claims at once. We handle complex mass arbitration strategies for consumer protection.",
    },
];

export default function ConsumerLawsOrbital({
    logo = "/fischettilogo.png",
    logoSize = 120,
}: ConsumerLawsOrbitalProps) {
    // Transform practiceAreas to match ConsumerLawItem interface
    const timelineData: ConsumerLawItem[] = practiceAreas.map((area, index) => ({
        id: index + 1,
        title: area.title,
        content: area.content,
        category: area.category,
        icon: area.icon,
        relatedIds: [], // You can add relationships later if needed
        status: "completed" as const,
        energy: 85 + (index * 2), // Varying energy levels
        slug: area.slug || area.category, // Use explicit slug if provided, otherwise fall back to category
    }));

    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);
                const relatedItems = getRelatedItems(id);
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer: NodeJS.Timeout;

        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.3) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 50);
        }

        return () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
            }
        };
    }, [autoRotate]);

    const centerViewOnNode = (nodeId: number) => {
        if (!nodeRefs.current[nodeId]) return;

        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        setRotationAngle(270 - targetAngle);
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 240;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.4,
            Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status: ConsumerLawItem["status"]): string => {
        switch (status) {
            case "completed":
                return "text-white bg-blue-600 border-blue-400";
            case "in-progress":
                return "text-blue-600 bg-white border-blue-600";
            case "pending":
                return "text-white bg-gray-600/40 border-gray-400/50";
            default:
                return "text-white bg-gray-600/40 border-gray-400/50";
        }
    };

    return (
        <div
            className="w-full h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-2xl relative"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full h-full flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50  [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem),linear-gradient(to_top,transparent,black_6rem)] ">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Center Logo - Replacing the gradient orb */}
                    <div className="absolute w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center z-10 border-4 border-blue-100">
                        <div className="absolute w-40 h-40 rounded-full border-2 border-blue-200/50 animate-ping opacity-30"></div>
                        <div
                            className="absolute w-48 h-48 rounded-full border border-blue-100/50 animate-ping opacity-20"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                            className="relative z-10"
                            style={{
                                width: `${logoSize}px`,
                                height: `${logoSize}px`,
                            }}
                        >
                            <Image
                                src={logo}
                                alt="Fischetti Law Group"
                                width={logoSize}
                                height={logoSize}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Orbital ring */}
                    <div className="absolute w-120 h-120 rounded-full border-2 border-blue-200/30"></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => (nodeRefs.current[item.id] = el)}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                {/* Pulse effect background */}
                                <div
                                    className={`absolute flex items-center justify-center animate-pulse rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""
                                        }`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(67,156,252,0.3) 0%, rgba(67,156,252,0) 70%)`,
                                        width: `${item.energy * 0.5 + 50}px`,
                                        height: `${item.energy * 0.5 + 50}px`,
                                        left: `-${(item.energy * 0.5 + 50 - 48) / 2}px`,
                                        top: `-${(item.energy * 0.5 + 50 - 48) / 2}px`,
                                    }}
                                ></div>

                                {/* Node circle */}
                                <div
                                    className={`
                                    w-12 h-12 rounded-full flex items-center justify-center
                                    ${isExpanded
                                            ? "bg-blue-600 text-white"
                                            : isRelated
                                                ? "bg-blue-500/70 text-white"
                                                : "bg-white text-blue-600"
                                        }
                                    border-2 
                                    ${isExpanded
                                            ? "border-blue-700 shadow-lg shadow-blue-500/30"
                                            : isRelated
                                                ? "border-blue-500 animate-pulse"
                                                : "border-blue-300"
                                        }
                                    transition-all duration-300 transform
                                    ${isExpanded ? "scale-150" : "hover:scale-110"}
                                `}
                                >
                                    <Icon size={20} />
                                </div>

                                {/* Label */}
                                <div
                                    className={`
                                    absolute top-14  whitespace-nowrap
                                    text-xs font-semibold tracking-wider text-center
                                    transition-all duration-300
                                    ${isExpanded ? "text-blue-600 scale-125 font-bold mt-3 left-2" : "text-gray-700"}
                                `}
                                >
                                    {item.title}
                                </div>

                                {/* Expanded Card */}
                                {isExpanded && (
                                    <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-lg border-blue-200 shadow-xl shadow-blue-500/20 overflow-visible z-[201]">
                                        <CardContent className="text-sm text-gray-700 leading-relaxed mt-0">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    className={`px-2 text-xs ${getStatusStyles(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.category.toUpperCase()}
                                                </Badge>
                                                <span className="text-xs font-mono text-gray-500">
                                                    Consumer Law
                                                </span>
                                            </div>
                                            <p className="text-lg mt-4 text-gray-900">{item.title}</p>
                                            <p>{item.content}</p>

                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-gray-200">
                                                    <div className="flex items-center mb-2">
                                                        <Link size={12} className="text-gray-500 mr-1" />
                                                        <h4 className="text-xs uppercase tracking-wider font-medium text-gray-600">
                                                            Related Areas
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = timelineData.find(
                                                                (i) => i.id === relatedId
                                                            );
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="flex items-center h-6 px-2 py-0 text-xs rounded-md border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                    <ArrowRight
                                                                        size={8}
                                                                        className="ml-1 text-blue-600"
                                                                    />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-4 pt-3 border-t border-gray-200">
                                                <a
                                                    href={`/consumer-law/${item.slug}`}
                                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors w-fit"
                                                >
                                                    Learn More About {item.title}
                                                    <ArrowRight size={14} className="ml-2" />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

