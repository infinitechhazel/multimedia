"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
}

interface GalleryLightboxProps {
  image: GalleryImage | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryLightbox({ image, onClose, onPrev, onNext }: GalleryLightboxProps) {
  if (!image) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-50"
          onClick={onClose}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Previous button */}
        <motion.button
          className="absolute left-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-50"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>

        {/* Next button */}
        <motion.button
          className="absolute right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-50"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>

        {/* Image container with geometric frame like DigiTank */}
        <motion.div
          className="relative max-w-5xl max-h-[85vh] w-full h-full mx-6 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Top-left corner accent */}
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-gold z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
            {/* Bottom-right corner accent */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-gold z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
            {/* Small square accent */}
            <motion.div
              className="absolute -bottom-8 -left-8 w-6 h-6 border border-white/40 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />

            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
          </div>
        </motion.div>

        {/* Caption */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white font-serif text-xl mb-2">{image.title}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
