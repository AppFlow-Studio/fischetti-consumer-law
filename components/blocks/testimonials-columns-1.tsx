"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Google from "../google";
function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

// Google-style avatar helpers
const avatarColorClasses = [
  "bg-red-100 text-red-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-indigo-100 text-indigo-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-teal-100 text-teal-700",
  "bg-rose-100 text-rose-700",
]
function getAvatarColorIndex(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i)
  return Math.abs(hash) % avatarColorClasses.length
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase()
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Review[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div className="p-10 rounded-3xl ring-1 ring-gray-200/70 shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ring-1 ring-white shadow-sm ${avatarColorClasses[getAvatarColorIndex(name)]}`}
                    >
                      {getInitials(name)}
                    </div>
                    <div className="flex flex-col">
                      {/* <div className="font-medium tracking-tight leading-5">{name}</div> */}
                      <div className="flex items-center flex-row  gap-2"><div className="font-medium tracking-tight leading-5">{name}</div><Google /></div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

;