"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

const galleryImages = [
  { src: "/fashion-model-portrait.png", alt: "Fashion portrait" },
  { src: "/photo/happy-woman-smiling-lifestyle.jpg", alt: "Lifestyle portrait" },
  { src: "/photo/modern-smartphone-product.jpg", alt: "Product shot" },
  { src: "/photo/family-outdoor-park-portrait.jpg", alt: "Family portrait" },
  { src: "/beverage-splash-photography.jpg", alt: "Product photography" },
  { src: "/photo/wedding-couple-romantic.jpg", alt: "Wedding" },
  { src: "/elegant-wedding-photography.png", alt: "Fashion portrait 2" },
  { src: "/celebration-party-event-photography.jpg", alt: "Lifestyle portrait 2" },
  { src: "/corporate-event-networking-business.jpg", alt: "Product shot 2" },
  { src: "/cosmetics-beauty-product-photography.jpg", alt: "Family portrait 2" },
  { src: "/elegant-wedding-ceremony-bride-groom.jpg", alt: "Product photography 2" },
  { src: "/family-outdoor-park.jpg", alt: "Wedding 2" },
  { src: "/gala-evening-event-photography.jpg", alt: "Fashion portrait 3" },
  { src: "/jewelry-product-photography-elegant.jpg", alt: "Lifestyle portrait 3" },
  { src: "/modern-smartphone.png", alt: "Product shot 3" },
]

interface FilmStripGalleryProps {
  direction?: "left" | "right"
  speed?: number
}

export function FilmStripGallery({ direction = "left", speed = 25 }: FilmStripGalleryProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll into scale - starts zoomed in, zooms out as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [2.5, 1, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <section ref={containerRef} className="py-8 bg-black overflow-hidden min-h-[100vh] flex items-center relative">
      <div className="relative w-full">
        {/* Film perforations top */}
        <div className="h-6 bg-black flex items-center justify-around border-y border-[#d4a574]/20 mb-4">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-[#d4a574]/20 rounded-sm" />
          ))}
        </div>

        {/* Image Grid with Zoom Effect */}
        <motion.div 
          className="grid grid-cols-5 gap-1 px-8 max-w-[1800px] mx-auto"
          style={{ scale, opacity: imageOpacity }}
        >
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-sm border border-[#d4a574]/30"
            >
              <Image 
                src={image.src || "/placeholder.svg"} 
                alt={image.alt} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />
              
              {/* Viewfinder corners */}
              <div className="absolute inset-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d4a574]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d4a574]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d4a574]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d4a574]"></div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Film perforations bottom */}
        <div className="h-6 bg-black flex items-center justify-around border-y border-[#d4a574]/20 mt-4">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-[#d4a574]/20 rounded-sm" />
          ))}
        </div>

        {/* Center Plus Icon Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
        >
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-[#d4a574]/80">
              <line x1="60" y1="20" x2="60" y2="100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <line x1="20" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <motion.div
              className="absolute inset-0 bg-[#d4a574]/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}