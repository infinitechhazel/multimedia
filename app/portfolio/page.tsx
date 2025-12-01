"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Camera, Aperture, Focus, ZoomIn, Sparkles, Film } from "lucide-react"

type Category = "all" | "weddings" | "portraits" | "events" | "products"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: Category
  title: string
  camera?: string
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/photo/elegant-wedding-ceremony.png",
    alt: "Wedding ceremony",
    category: "weddings",
    title: "Elegant Ceremony",
    camera: "Canon R5",
  },
  {
    id: "2",
    src: "/photo/bride-groom-romantic-portrait.jpg",
    alt: "Bride and groom",
    category: "weddings",
    title: "Bride & Groom",
    camera: "Sony A7IV",
  },
  {
    id: "3",
    src: "/wedding-reception-table-flowers.jpg",
    alt: "Reception details",
    category: "weddings",
    title: "Reception Details",
    camera: "Canon R6",
  },
  {
    id: "4",
    src: "/photo/professional-headshot-businessman.jpg",
    alt: "Professional headshot",
    category: "portraits",
    title: "Professional Portrait",
    camera: "Sony A1",
  },
  {
    id: "5",
    src: "/lifestyle-outdoor-portrait-woman-nature.jpg",
    alt: "Lifestyle portrait",
    category: "portraits",
    title: "Lifestyle Session",
    camera: "Fuji X-T5",
  },
  {
    id: "6",
    src: "/family-portrait-outdoor-park-happy.jpg",
    alt: "Family portrait",
    category: "portraits",
    title: "Family Portrait",
    camera: "Canon R5",
  },
  {
    id: "7",
    src: "/corporate-event-networking-business.jpg",
    alt: "Corporate event",
    category: "events",
    title: "Corporate Event",
    camera: "Sony A7IV",
  },
  {
    id: "8",
    src: "/gala-evening-formal-event.jpg",
    alt: "Gala event",
    category: "events",
    title: "Gala Evening",
    camera: "Canon R3",
  },
  {
    id: "9",
    src: "/celebration-party-balloons-confetti.jpg",
    alt: "Party event",
    category: "events",
    title: "Celebration Party",
    camera: "Nikon Z8",
  },
  {
    id: "10",
    src: "/luxury-watch-product-photography.jpg",
    alt: "Product photography",
    category: "products",
    title: "Luxury Watch",
    camera: "Phase One",
  },
  {
    id: "11",
    src: "/jewelry-diamond-necklace-elegant.jpg",
    alt: "Jewelry product",
    category: "products",
    title: "Jewelry Collection",
    camera: "Hasselblad",
  },
  {
    id: "12",
    src: "/cosmetics-beauty-skincare-products.jpg",
    alt: "Beauty products",
    category: "products",
    title: "Beauty Products",
    camera: "Canon R5",
  },
]

const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All Work", icon: <Camera className="w-4 h-4" /> },
  { value: "weddings", label: "Weddings", icon: <Aperture className="w-4 h-4" /> },
  { value: "portraits", label: "Portraits", icon: <Focus className="w-4 h-4" /> },
  { value: "events", label: "Events", icon: <ZoomIn className="w-4 h-4" /> },
  { value: "products", label: "Products", icon: <Film className="w-4 h-4" /> },
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredImages = useMemo(() => {
    return selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated gold particles background */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}

      {/* Hero Section with Film Strip Effect */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Animated film perforations - gold */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-black border-b-2 border-amber-500 flex items-center overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: [0, -200] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(50)].map((_, i) => (
              <div key={i} className="w-10 h-7 bg-gradient-to-b from-amber-500 to-amber-600 mx-3 rounded-sm shadow-lg shadow-amber-500/30" />
            ))}
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto text-center pt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Camera viewfinder decoration */}
            <div className="inline-block relative mb-8">
              <motion.div
                className="absolute -top-6 -left-6 w-12 h-12 border-l-3 border-t-3 border-amber-500"
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="absolute top-0 left-0 w-3 h-3 bg-amber-500 rounded-full" />
              </motion.div>
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 border-r-3 border-t-3 border-amber-500"
                initial={{ opacity: 0, x: 10, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="absolute top-0 right-0 w-3 h-3 bg-amber-500 rounded-full" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 border-l-3 border-b-3 border-amber-500"
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-amber-500 rounded-full" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-12 h-12 border-r-3 border-b-3 border-amber-500"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 rounded-full" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-serif font-light text-white px-12 py-6">
                Our <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent font-bold">Portfolio</span>
              </h1>
            </div>

            {/* Sparkle decorations */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-6 h-6 text-amber-500" />
              </motion.div>
              <p className="text-lg text-gray-300 max-w-2xl">
                A curated selection of our finest work across weddings, portraits, events, and commercial photography.
              </p>
              <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-6 h-6 text-amber-500" />
              </motion.div>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-1 w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter - Camera Dial Style */}
      <section className="px-6 py-8 sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-y border-amber-500/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 relative overflow-hidden ${
                  selectedCategory === category.value
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-2xl shadow-amber-500/50 scale-110"
                    : "bg-black text-amber-500 hover:bg-amber-500/10 border-2 border-amber-500/30"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: selectedCategory === category.value ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Flash effect on active */}
                {selectedCategory === category.value && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}
                <motion.div
                  animate={selectedCategory === category.value ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.div>
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid with Enhanced Hover Effects */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  transition={{ delay: index * 0.08, duration: 0.6, type: "spring" }}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredId(image.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -10 }}
                >
                  {/* Gold frame with shadow */}
                  <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 p-1 rounded-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 border-2 border-amber-500/30">
                    <div className="bg-black p-4 pb-20 rounded-lg relative overflow-hidden">
                      <div className="relative aspect-[4/5] overflow-hidden rounded">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                        />

                        {/* Gold overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                        {/* Camera shutter effect - iris close */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600"
                          initial={{ clipPath: "circle(0% at 50% 50%)" }}
                          animate={{
                            clipPath: hoveredId === image.id 
                              ? ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)", "circle(0% at 50% 50%)"]
                              : "circle(0% at 50% 50%)"
                          }}
                          transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                        />

                        {/* Viewfinder overlay - animated */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {/* Rule of thirds grid */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="absolute top-1/3 left-0 right-0 h-px bg-amber-500/60" />
                            <div className="absolute top-2/3 left-0 right-0 h-px bg-amber-500/60" />
                            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-amber-500/60" />
                            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-amber-500/60" />
                          </motion.div>

                          {/* Focus brackets - animated corners */}
                          <motion.div
                            className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-500"
                            initial={{ x: -10, y: -10, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          />
                          <motion.div
                            className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-500"
                            initial={{ x: 10, y: -10, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ delay: 0.45 }}
                          />
                          <motion.div
                            className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-500"
                            initial={{ x: -10, y: 10, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          />
                          <motion.div
                            className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-500"
                            initial={{ x: 10, y: 10, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ delay: 0.55 }}
                          />

                          {/* Center focus point */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                              className="w-20 h-20 border-2 border-amber-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="absolute top-1/2 left-0 w-full h-px bg-amber-500" />
                              <div className="absolute top-0 left-1/2 w-px h-full bg-amber-500" />
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50" />
                            </motion.div>
                          </div>

                          {/* Camera info badge */}
                          <motion.div
                            className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-black rounded-full"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            {image.camera}
                          </motion.div>
                        </motion.div>

                        {/* Zoom indicator */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          initial={{ scale: 2, opacity: 0 }}
                          animate={hoveredId === image.id ? { scale: 1, opacity: [0, 1, 0] } : { scale: 2, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <ZoomIn className="w-16 h-16 text-amber-500" />
                        </motion.div>
                      </div>

                      {/* Caption area */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.h3
                          className="font-serif text-xl text-white mb-1"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {image.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm text-amber-500 capitalize font-bold tracking-wider"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {image.category}
                        </motion.p>
                      </div>

                      {/* Corner glow effects */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-amber-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black relative overflow-hidden border-t-2 border-amber-500">
        {/* Rotating aperture decoration */}
        <motion.div
          className="absolute -right-32 -top-32 w-96 h-96 border-[40px] border-amber-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -left-32 -bottom-32 w-96 h-96 border-[40px] border-amber-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Aperture className="w-20 h-20 text-amber-500" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-light text-white mb-6"
          >
            Ready to Create Your <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent font-bold">Vision</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Let's discuss your project and bring your creative vision to life with stunning photography.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 font-bold shadow-xl shadow-amber-500/30 border-2 border-black">
              <Link href="/booking">
                <Camera className="w-5 h-5 mr-2" />
                Book a Session
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black bg-transparent font-bold"
            >
              <Link href="/about">Learn About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}