"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight, Star, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingParticles from "../animated-golden-particles"

const testimonials = [
  {
    name: "Sarah & Michael",
    role: "Wedding Clients",
    content:
      "Luminous Studio captured our wedding day with absolute perfection. Every emotion, every tear of joy - they caught it all. The professionalism and artistic vision were outstanding.",
    rating: 5,
    image: "/happy-couple-wedding-portrait-smiling.jpg",
    category: "Wedding",
  },
  {
    name: "Emma Thompson",
    role: "Entrepreneur",
    content:
      "Our product photography exceeded expectations. The attention to detail and lighting expertise really elevated our brand to a whole new level.",
    rating: 5,
    image: "/professional-woman-entrepreneur-headshot.png",
    category: "Commercial",
  },
  {
    name: "James Chen",
    role: "Corporate Client",
    content:
      "From concept to delivery, the team was exceptional. Our event coverage captured the exact energy and essence we wanted. Highly recommend!",
    rating: 5,
    image: "/asian-businessman-professional-headshot.jpg",
    category: "Events",
  },
  {
    name: "Lara Mendoza",
    role: "Fashion Model",
    content: "Every shot felt intentional and beautifully executed. The artistic direction and lighting made the images look editorial and timeless.",
    rating: 5,
    image: "/fashion-model-woman-portrait-elegant.jpg",
    category: "Portrait",
  },
  {
    name: "David Reyes",
    role: "CEO, Crestline Systems",
    content: "Professional, reliable, and incredibly easy to work with. Our executive portraits look polished and modern—exactly what we needed.",
    rating: 5,
    image: "/executive-man-ceo-professional-headshot.jpg",
    category: "Corporate",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const next = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction > 0 ? 20 : -20,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction < 0 ? 20 : -20,
      scale: 0.9,
    }),
  }

  return (
    <section className="py-20 md:py-28 bg-black overflow-hidden relative">
      {/* Animated gold particles */}
      <FloatingParticles count={20} />

      {/* Floating camera lens effect */}
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32 border-2 border-[#d4a574]/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-[15%] w-40 h-40 border-2 border-[#d4a574]/15 rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#d4a574]/10 border border-[#d4a574]/30 text-[#d4a574] px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: ["0 0 20px rgba(212, 165, 116, 0.1)", "0 0 30px rgba(212, 165, 116, 0.2)", "0 0 20px rgba(212, 165, 116, 0.1)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">Client Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
          >
            What Our Clients{" "}
            <span className="bg-gradient-to-r from-[#d4a574] via-[#e0b584] to-[#d4a574] bg-clip-text text-transparent italic">Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Real experiences from clients who trusted us to capture their most precious moments
          </motion.p>
        </motion.div>

        {/* Main testimonial display */}
        <div className="sm:max-w-3xl md:max-w-4xl mx-auto px-4">
          <div className="relative w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
              >
                <div
                  className="relative overflow-hiddenbg-gradient-to-br from-neutral-900 to-blackrounded-2xl shadow-2xl shadow-[#d4a574]/20 border-2 border-[#d4a574]/30 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center min-h-[420px] sm:min-h-[460px] md:min-h-[500px]"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, #d4a574 1px, transparent 0)",
                      backgroundSize: "40px 40px",
                    }}
                    animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Quote Icon */}
                  <motion.div
                    className="flex justify-center my-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#d4a574] to-[#c9944a] flex items-center justify-center shadow-lg shadow-[#d4a574]/50"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                    </motion.div>
                  </motion.div>

                  {/* Rating stars */}
                  <div className="flex justify-center gap-1.5 mb-6 sm:mb-8">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      >
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-[#d4a574] text-[#d4a574]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <motion.blockquote
                    className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed text-center mb-8 sm:mb-10 max-w-3xl mx-auto font-light relative z-10 px-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </motion.blockquote>

                  {/* Client Info */}
                  <motion.div
                    className="flex flex-col items-center gap-5 sm:gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#d4a574]/40 shadow-xl shadow-[#d4a574]/20 bg-neutral-800"
                        whileHover={{ scale: 1.1, borderColor: "rgba(212, 165, 116, 0.8)" }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Image placeholder */}
                      </motion.div>

                      {/* Badge */}
                      <motion.span
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold bg-gradient-to-r from-[#d4a574] to-[#c9944a] text-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
                        animate={{
                          boxShadow: ["0 0 10px rgba(212, 165, 116, 0.3)", "0 0 20px rgba(212, 165, 116, 0.6)", "0 0 10px rgba(212, 165, 116, 0.3)"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {testimonials[currentIndex].category}
                      </motion.span>
                    </div>

                    <div className="text-center mb-2 sm:mb-4">
                      <p className="font-serif text-xl sm:text-2xl text-white mb-1">{testimonials[currentIndex].name}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{testimonials[currentIndex].role}</p>
                    </div>
                  </motion.div>

                  {/* Corner Decorations */}
                  <div className="absolute top-3 left-3 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-[#d4a574]/50" />
                  <div className="absolute top-3 right-3 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-[#d4a574]/50" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-[#d4a574]/50" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-[#d4a574]/50" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <motion.div
            className="flex justify-center items-center gap-4 sm:gap-6 mt-12 sm:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#d4a574]/40 hover:bg-[#d4a574]/20 hover:border-[#d4a574] bg-black/50 backdrop-blur-sm shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4a574]" />
              </Button>
            </motion.div>

            <div className="flex gap-2 items-center px-2 sm:px-4">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-gradient-to-r from-[#d4a574] to-[#c9944a]"
                      : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#d4a574]/30 hover:bg-[#d4a574]/60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#d4a574]/40 hover:bg-[#d4a574]/20 hover:border-[#d4a574] bg-black/50 backdrop-blur-sm shadow-lg transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4a574]" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
