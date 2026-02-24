"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { isOptimizableUrl } from "@/lib/is-optimizable-url"

type CdnImageGalleryProps = {
  images?: string[] | null
  postTitle: string
}

export function CdnImageGallery({ images, postTitle }: CdnImageGalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section className="mt-6 sm:mt-8" aria-label="Article images">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {images.map((url, index) => {
          const alt = `${postTitle} - Image ${index + 1}`
          const optimizable = isOptimizableUrl(url)

          return (
            <motion.div
              key={url + index.toString()}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200/80 bg-white shadow-sm ring-1 ring-gray-900/5"
            >
              {optimizable ? (
                <div className="relative w-full h-40 sm:h-48">
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt={alt}
                  className="h-40 sm:h-48 w-full object-cover"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
