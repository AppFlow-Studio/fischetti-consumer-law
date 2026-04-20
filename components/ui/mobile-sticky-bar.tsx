'use client'

import { Phone, FileText } from 'lucide-react'
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from '@/lib/site'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const element = document.getElementById('case-review-form')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md lg:hidden"
        >
          <div className="flex items-center gap-2 p-2 bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 rounded-2xl overflow-hidden">
            <a
              href={`tel:${PRIMARY_PHONE_E164}`}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold text-sm transition-colors active:bg-blue-100"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={scrollToForm}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 active:bg-blue-700"
            >
              <FileText className="w-4 h-4" />
              Free Review
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
