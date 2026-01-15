"use client"
<<<<<<< HEAD
=======

>>>>>>> fork/fork/main
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Camera, Aperture, CameraIcon, Focus, ZoomIn, Film } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
<<<<<<< HEAD
import Image from "next/image"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import FloatingParticles from "@/components/animated-golden-particles"

type Category = "all" | "wedding" | "portrait" | "event" | "product" | "studio"

const posts = [
  {
    id: "1",
    title: "10 Tips for Perfect Wedding Photography",
    excerpt:
      "Discover the secrets to capturing stunning wedding moments that will be treasured for a lifetime. From lighting to composition, we share our expert tips.",
    content:
      "Wedding photography is about more than just taking pictures, it’s about telling a story. Start by understanding the couple’s vision and scouting the venue for the best lighting opportunities. Use natural light whenever possible, but don’t be afraid to bring in soft artificial lighting for consistency. Pay attention to candid moments, as they often capture the most genuine emotions. Composition matters: frame shots with leading lines, symmetry, and depth to add artistry. Finally, always back up your files immediately after the shoot to ensure nothing is lost.",
    date: "Mar 15, 2025",
    author: "Studio Team",
    label: "Wedding Tips",
    category: "wedding",
    image: "/romantic-wedding-portrait.png",
  },
  {
    id: "2",
    title: "The Art of Portrait Photography",
    excerpt:
      "Learn how to bring out the best in every portrait session. We explore lighting techniques, posing, and creating a comfortable atmosphere for clients.",
    content:
      "Portrait photography is about capturing personality as much as appearance. Start by building rapport with your subject to make them feel comfortable. Lighting plays a crucial role. Soft, diffused light often works best to flatter facial features. Experiment with angles and poses to highlight unique characteristics, and don’t be afraid to incorporate props or environments that reflect the subject’s identity. A relaxed atmosphere leads to authentic expressions, which are the hallmark of a great portrait.",
    date: "Mar 10, 2025",
    author: "Studio Team",
    label: "Portrait Tips",
    category: "portrait",
    image: "/professional-business-headshot-portrait.webp",
  },
  {
    id: "3",
    title: "Event Photography Best Practices",
    excerpt:
      "Master the art of event photography with our comprehensive guide. From preparation to execution, ensure you never miss a crucial moment.",
    content:
      "Event photography requires preparation, anticipation, and adaptability. Before the event, familiarize yourself with the schedule and key participants. Arrive early to scout the venue and plan your angles. During the event, focus on capturing candid moments that convey emotion and atmosphere, while also documenting important highlights like speeches or performances. Use a fast lens to handle low-light conditions, and always carry backup gear. Delivering a balanced mix of wide shots, close-ups, and detail images ensures a complete visual story.",
    date: "Mar 5, 2025",
    author: "Studio Team",
    label: "Event Tips",
    category: "event",
    image: "/corporate-event-networking-business.webp",
  },
  {
    id: "4",
    title: "Product Photography Essentials",
    excerpt: "Highlight your products with stunning visuals. Learn techniques for lighting, angles, and backgrounds that make items stand out.",
    content:
      "Product photography is about making items look appealing and true to life. Begin with a clean background that doesn’t distract from the subject. Lighting should be even and controlled. Softboxes or natural diffused light work well to eliminate harsh shadows. Experiment with angles to showcase key features, and consider close-up shots for details. Props can add context, but keep them minimal to avoid clutter. Post-processing should enhance clarity and color accuracy, ensuring the product looks both attractive and authentic.",
    date: "Feb 28, 2025",
    author: "Studio Team",
    label: "Product Tips",
    category: "product",
    image: "/beverage-splash-photography.webp",
  },
  {
    id: "5",
    title: "Commercial Photography Insights",
    excerpt: "Explore how to create compelling images for advertising and branding. We cover storytelling, composition, and working with clients.",
    content:
      "Commercial photography blends creativity with strategy. The goal is to produce images that align with a brand’s identity and marketing objectives. Start by understanding the client’s vision and target audience. Use composition techniques to guide the viewer’s eye toward the product or message. Storytelling is key. Images should evoke emotions that resonate with consumers. Collaboration with art directors and stylists often enhances the final result. Delivering polished, high-quality visuals helps businesses stand out in competitive markets.",
    date: "Feb 20, 2025",
    author: "Studio Team",
    label: "Commercial Tips",
    category: "product",
    image: "/cosmetics-beauty-skincare-products.webp",
  },
  {
    id: "6",
    title: "Behind the Lens: A Day in the Studio",
    excerpt: "Step inside our creative space and see how we prepare for shoots, from setting up backdrops to working with clients.",
    content:
      "A typical day in the studio begins with setting up equipment and testing lighting. Backdrops are arranged depending on the theme of the shoot, and props are carefully selected to complement the subject. Collaboration with clients is key, we walk them through the process to make them feel comfortable and confident. Breaks are scheduled to keep energy levels high, and the lounge area provides a space for relaxation. By the end of the day, we review the shots together, ensuring that the client’s vision has been captured.",
    date: "Apr 2, 2025",
    author: "Studio Team",
    label: "Studio Life",
    category: "studio",
    image: "/professional-studio-lighting-setup.webp",
  },
]

=======
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import FloatingParticles from "@/components/animated-golden-particles"
import { Post } from "@/lib/types/types"
import ScrollZoomCard from "@/components/blog/scroll-zoom-card"
import Marquee from "react-fast-marquee"

type Category = "all" | "wedding" | "portrait" | "event" | "product" | "studio"

>>>>>>> fork/fork/main
const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All Posts", icon: <Camera className="w-4 h-4" /> },
  { value: "wedding", label: "Weddings", icon: <Aperture className="w-4 h-4" /> },
  { value: "portrait", label: "Portraits", icon: <Focus className="w-4 h-4" /> },
  { value: "event", label: "Events", icon: <ZoomIn className="w-4 h-4" /> },
  { value: "product", label: "Products", icon: <Film className="w-4 h-4" /> },
  { value: "studio", label: "Studio", icon: <CameraIcon className="w-4 h-4" /> },
]

<<<<<<< HEAD
const featuredPost = posts[0]
=======
function getImageSrc(image: string | File | null): string | undefined {
  if (!image) return undefined
  if (typeof image === "string") {
    const normalized = image.includes("/storage/") ? image : `/storage/${image.replace(/^\/+/, "")}`
    return `${process.env.NEXT_PUBLIC_API_IMG}${normalized}`
  }
  if (image instanceof File) {
    return URL.createObjectURL(image)
  }
}
>>>>>>> fork/fork/main

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
<<<<<<< HEAD
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

// Camera shutter animation
const shutterVariants = {
  closed: {
    clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
  },
  open: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
}

// Flash effect
const flashVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: { duration: 0.5, times: [0, 0.5, 1] },
  },
}

// Lens focus effect
const focusRing = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [0.8, 1.2, 1],
    opacity: [0, 1, 0],
    transition: { duration: 2, repeat: Infinity, repeatDelay: 3 },
  },
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory)
  const post = posts.find((p) => p.id === selectedPost)

  // Scroll-triggered zoom effect for featured post
  const featuredRef = useRef(null)
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  })
  const featuredScale = useTransform(featuredProgress, [0, 0.5, 1], [1.3, 1, 1])
  const featuredOpacity = useTransform(featuredProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a0f0a] via-[#2d1810] to-[#4a2818] relative overflow-hidden">
      {/* Animated Gold Particles */}
=======
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

// Shutter animation
const shutterVariants = {
  closed: { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
  open: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
}

const flashVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: [0, 1, 0], transition: { duration: 0.5, times: [0, 0.5, 1] } },
}

const focusRing = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: [0.8, 1.2, 1], opacity: [0, 1, 0], transition: { duration: 2, repeat: Infinity, repeatDelay: 3 } },
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory)
  const post = selectedPost ? posts.find((p) => p.id === selectedPost) : null

  const featuredPosts = posts.filter((p) => p.featured === true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        if (Array.isArray(data.posts)) {
          setPosts(data.posts)
        } else {
          setPosts([])
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err)
      }
    }
    fetchPosts()
  }, [])
  console.log(posts)
  console.log(featuredPosts)
  return (
    <div className="min-h-screen pt-20 bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#4a2818] relative overflow-hidden">
>>>>>>> fork/fork/main
      <FloatingParticles count={20} />

      {/* Hero Section */}
      <motion.section className="pt-20 pb-20 px-6 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
<<<<<<< HEAD
        {/* Camera Shutter Effect */}
=======
>>>>>>> fork/fork/main
        <motion.div
          className="absolute inset-0 bg-black z-10 pointer-events-none"
          initial="closed"
          animate="open"
          variants={shutterVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Flash Effect */}
        <motion.div className="absolute inset-0 bg-amber-200 z-20 pointer-events-none" variants={flashVariants} initial="hidden" animate="visible" />

        {/* Floating Camera Icons */}
        <motion.div
          className="absolute top-20 left-10 text-[#d4a574]/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Camera size={60} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-[#d4a574]/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Aperture size={80} />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-30">
          {/* Animated gold particles */}
          <FloatingParticles count={20} />

          <motion.p
            className="text-sm uppercase tracking-widest bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-[length:200%_200%] bg-clip-text text-transparent font-semibold"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Blog
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-serif text-white leading-tight"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Power of{" "}
            <motion.span
              className="bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-[length:200%_200%] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Visual Storytelling
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Discover how visual narratives can transform your photography and engage your audience.
          </motion.p>
        </div>
      </motion.section>

<<<<<<< HEAD
      {/* Featured Post */}
      <motion.section
        ref={featuredRef}
        className="px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <Card
            className="overflow-hidden group bg-gradient-to-br from-[#2d1810]/80 to-[#1a0f0a]/80 border-[#d4a574]/30 hover:border-[#d4a574] transition-all duration-500 shadow-2xl hover:shadow-[#d4a574]/20 relative backdrop-blur-sm"
            onClick={() => setSelectedPost(featuredPost.id)}
          >
            {/* Focus Ring Animation */}
            <motion.div
              className="absolute inset-0 border-4 border-[#d4a574]/50 rounded-lg pointer-events-none"
              variants={focusRing}
              initial="initial"
              animate="animate"
            />

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <motion.div className="w-full h-full" style={{ scale: featuredScale, opacity: featuredOpacity }}>
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    sizes="w-full h-full"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-amber-900/20 to-transparent" />

                {/* Lens Flare Effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#d4a574]/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center relative">
                <span className="inline-block px-3 py-1 bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-[length:200%_200%] text-xs font-semibold rounded-full w-fit mb-4 border border-[#d4a574]/30">
                  {featuredPost.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-[#d4a574] bg-clip-text text-transparent group-hover:from-[#d4a574] group-hover:to-[#c9944a] transition-all duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#d4a574]" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#d4a574]" />
                    {featuredPost.author}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Category Filter & Posts Grid */}
      <motion.section
        className="px-6 pb-24"
=======
      {/* Featured Posts */}
      <div className="my-4">
        {/* <Marquee> */}
        {featuredPosts.map((featuredPost) => (
          <motion.section
            key={featuredPost.id}
            className="px-6 pb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-6xl mx-auto">
              <Card
                className="overflow-hidden group bg-linear-to-br from-[#2d1810]/80 to-[#1a0f0a]/80 border-[#d4a574]/30 hover:border-[#d4a574] transition-all duration-500 shadow-2xl hover:shadow-[#d4a574]/20 relative backdrop-blur-sm"
                onClick={() => setSelectedPost(featuredPost.id)}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <motion.div
                      initial={{ scale: 1.25, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <img
                        src={getImageSrc(featuredPost.image) || "/placeholder.svg"}
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-amber-900/20 to-transparent" />
                  </div>

                  <motion.div
                    className="p-8 md:p-12 flex flex-col justify-center relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.15 } },
                    }}
                  >
                    <motion.span
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6 }}
                      className="inline-block px-3 py-1 bg-linear-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-xs font-semibold rounded-full w-fit mb-4 border border-[#d4a574]/30"
                    >
                      {featuredPost.label}
                    </motion.span>

                    <motion.h2
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl md:text-3xl font-bold mb-4"
                    >
                      {featuredPost.title}
                    </motion.h2>

                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6 }}
                      className="text-gray-300 mb-6 leading-relaxed"
                    >
                      {featuredPost.excerpt}
                    </motion.p>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6 }}
                      className="flex items-center gap-4 text-sm text-gray-400"
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#d4a574]" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-[#d4a574]" />
                        {featuredPost.author}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </Card>
            </div>
          </motion.section>
        ))}
        {/* </Marquee> */}
      </div>

      {/* Posts Grid */}
      <motion.section
        className="px-6 pb-20"
>>>>>>> fork/fork/main
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
<<<<<<< HEAD
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat, index) => (
              <motion.div key={cat.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <motion.button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 relative overflow-hidden ${
                    selectedCategory === cat.value
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-2xl shadow-amber-500/50 scale-110"
                      : "bg-black text-amber-500 hover:bg-amber-500/10 border-2 border-amber-500/30"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: selectedCategory === cat.value ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Flash effect on active */}
                  {selectedCategory === cat.value && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  )}
                  <motion.div animate={selectedCategory === cat.value ? { rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
                    {cat.icon}
                  </motion.div>
                  {cat.label}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Posts Grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={fadeInUp} transition={{ duration: 0.8, ease: "easeOut" }}>
            <AnimatePresence mode="popLayout">
=======
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold ${
                  selectedCategory === cat.value ? "bg-amber-500 text-black" : "bg-black text-amber-500"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
>>>>>>> fork/fork/main
              {filteredPosts.map((post, index) => (
                <ScrollZoomCard key={post.id} post={post} index={index} onClick={() => setSelectedPost(post.id)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

<<<<<<< HEAD
      {/* CTA Section */}
      <motion.section
        className="py-36 px-6 bg-gradient-to-br from-[#2d1810] via-[#1a0f0a] to-[#2d1810] text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
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
        {/* Animated Gold Orbs */}
        <FloatingParticles count={20} />

        <motion.div
          className="absolute bottom-0 -right-20 w-96 h-96 bg-[#c9944a]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Film Strip Effect */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.p
            className="text-sm uppercase tracking-widest bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-[length:200%_200%] bg-clip-text text-transparent font-semibold"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to Start?
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-serif text-balance"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Let's Capture Your{" "}
            <span className="bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-[length:200%_200%] bg-clip-text text-transparent">
              Story
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Whether it's a wedding, portrait session, or commercial project, we're here to bring your vision to life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 font-bold shadow-xl shadow-amber-500/30 border-2 border-black"
              >
                <Link href="/contact">Book a Session</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black bg-transparent font-bold"
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Post Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl h-[90vh] bg-gradient-to-br from-[#2d1810] to-[#1a0f0a] border-[#d4a574]/50 overflow-y-auto scrollbar-hide">
          {post && (
            <>
              <DialogHeader>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#d4a574]/20 to-[#c9944a]/20 text-[#d4a574] text-xs font-semibold rounded-full w-fit mb-2 border border-[#d4a574]/30">
                  {post.label}
                </span>
                <DialogTitle className="text-2xl font-serif bg-gradient-to-r from-white to-[#d4a574] bg-clip-text text-transparent">
=======
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl h-[90vh] bg-linear-to-br from-[#2d1810] to-[#1a0f0a] border-[#d4a574]/50 overflow-y-auto scrollbar-hide">
          {post && (
            <>
              <DialogHeader>
                <span className="inline-block px-3 py-1 bg-linear-to-r from-[#d4a574]/20 to-[#c9944a]/20 text-[#d4a574] text-xs font-semibold rounded-full w-fit mb-2 border border-[#d4a574]/30">
                  {post.label}
                </span>
                <DialogTitle className="text-2xl font-serif bg-linear-to-r from-white to-[#d4a574] bg-clip-text text-transparent">
>>>>>>> fork/fork/main
                  {post.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#d4a574]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#d4a574]" />
                    {post.author}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="relative h-64 rounded-lg overflow-hidden my-4">
<<<<<<< HEAD
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill sizes="w-full h-full" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/60 to-transparent" />
=======
                <img src={getImageSrc(post.image) || "/placeholder.svg"} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-r from-[#1a0f0a]/60 to-transparent" />
>>>>>>> fork/fork/main
              </div>
              <span className="block mb-4 text-xl font-medium text-gold/90 italic border-l-4 border-gold pl-3 py-1">{post.excerpt}</span>
              <p className="text-gray-300 leading-relaxed">{post.content}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
<<<<<<< HEAD

// Scroll zoom component for blog cards
function ScrollZoomCard({ post, index, onClick }: { post: (typeof posts)[0]; index: number; onClick: () => void }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.4, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card
        className="overflow-hidden gap-0 p-0 group h-full bg-gradient-to-br from-[#2d1810]/80 to-[#1a0f0a]/80 border-[#d4a574]/30 hover:border-[#d4a574] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4a574]/20 relative backdrop-blur-sm"
        onClick={onClick}
      >
        {/* Camera Flash on Hover */}
        <motion.div
          className="absolute inset-0 bg-white z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative h-48 overflow-hidden">
          <motion.div className="w-full h-full" style={{ scale, opacity }}>
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill sizes="w-full h-full" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Animated Viewfinder */}
          <motion.div
            className="absolute inset-4 border-2 border-[#d4a574]/0 group-hover:border-[#d4a574]/50 transition-all duration-300"
            initial={false}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d4a574]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d4a574]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d4a574]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d4a574]"></div>
          </motion.div>

          <span className="absolute top-6 left-6 px-3 py-1 bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-size-[200%_200%] text-black text-xs font-semibold rounded-full z-20 shadow-lg">
            {post.label}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white to-[#d4a574] bg-clip-text text-transparent group-hover:from-[#d4a574] group-hover:to-[#c9944a] transition-all duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#d4a574]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-[#d4a574] group-hover:underline">
              Read More <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
=======
>>>>>>> fork/fork/main
