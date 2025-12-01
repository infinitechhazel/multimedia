"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Camera, Aperture } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

const posts = [
  {
    id: "1",
    title: "10 Tips for Perfect Wedding Photography",
    excerpt: "Discover the secrets to capturing stunning wedding moments that will be treasured for a lifetime.",
    content:
      "Wedding photography is about more than just taking pictures, it's about telling a story. Start by understanding the couple's vision and scouting the venue for the best lighting opportunities.",
    date: "March 15, 2025",
    author: "Studio Team",
    label: "Wedding Tips",
    category: "wedding",
    image: "/wedding-couple.png",
  },
  {
    id: "2",
    title: "The Art of Portrait Photography",
    excerpt: "Learn how to bring out the best in every portrait session with lighting techniques and posing tips.",
    content:
      "Portrait photography is about capturing personality as much as appearance. Start by building rapport with your subject to make them feel comfortable.",
    date: "March 10, 2025",
    author: "Studio Team",
    label: "Portrait Tips",
    category: "portrait",
    image: "/wedding-reception-table-details.jpg",
  },
  {
    id: "3",
    title: "Event Photography Best Practices",
    excerpt: "Master the art of event photography with our comprehensive guide to never missing a crucial moment.",
    content:
      "Event photography requires preparation, anticipation, and adaptability. Before the event, familiarize yourself with the schedule and key participants.",
    date: "March 5, 2025",
    author: "Studio Team",
    label: "Event Tips",
    category: "event",
    image: "/wedding-reception-table-flowers.jpg",
  },
  {
    id: "4",
    title: "Product Photography Essentials",
    excerpt: "Highlight your products with stunning visuals using proper lighting, angles, and backgrounds.",
    content:
      "Product photography is about making items look appealing and true to life. Begin with a clean background that doesn't distract from the subject.",
    date: "February 28, 2025",
    author: "Studio Team",
    label: "Product Tips",
    category: "product",
    image: "/professional-studio-lighting-setup.jpg",
  },
  {
    id: "5",
    title: "Commercial Photography Insights",
    excerpt: "Explore how to create compelling images for advertising and branding with storytelling techniques.",
    content:
      "Commercial photography blends creativity with strategy. The goal is to produce images that align with a brand's identity and marketing objectives.",
    date: "February 20, 2025",
    author: "Studio Team",
    label: "Commercial Tips",
    category: "product",
    image: "/professional-studio-lighting-setup.jpg",
  },
  {
    id: "6",
    title: "Behind the Lens: A Day in the Studio",
    excerpt: "Step inside our creative space and see how we prepare for shoots, from setup to execution.",
    content:
      "A typical day in the studio begins with setting up equipment and testing lighting. Backdrops are arranged depending on the theme of the shoot.",
    date: "April 2, 2025",
    author: "Studio Team",
    label: "Studio Life",
    category: "studio",
    image: "/professional-studio-lighting-setup.jpg",
  },
]

const categories = [
  { id: "all", label: "All Posts" },
  { id: "wedding", label: "Weddings" },
  { id: "portrait", label: "Portraits" },
  { id: "event", label: "Events" },
  { id: "product", label: "Products" },
  { id: "studio", label: "Studio" },
]

const featuredPost = posts[0]

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
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
    transition: { duration: 0.5, times: [0, 0.5, 1] }
  }
}

// Lens focus effect
const focusRing = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: [0.8, 1.2, 1],
    opacity: [0, 1, 0],
    transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }
  }
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
    offset: ["start end", "end start"]
  })
  const featuredScale = useTransform(featuredProgress, [0, 0.5, 1], [1.3, 1, 1])
  const featuredOpacity = useTransform(featuredProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a0f0a] via-[#2d1810] to-[#4a2818] relative overflow-hidden">
      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4a574]/30 rounded-full"
            initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: -20 }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        className="pt-20 pb-20 px-6 relative overflow-hidden" 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
      >
        {/* Camera Shutter Effect */}
        <motion.div
          className="absolute inset-0 bg-black z-10 pointer-events-none"
          initial="closed"
          animate="open"
          variants={shutterVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Flash Effect */}
        <motion.div
          className="absolute inset-0 bg-amber-200 z-20 pointer-events-none"
          variants={flashVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Floating Camera Icons */}
        <motion.div
          className="absolute top-20 left-10 text-[#d4a574]/20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Camera size={60} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-[#d4a574]/20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Aperture size={80} />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-30">
          <motion.p
            className="text-sm uppercase tracking-widest bg-gradient-to-r from-[#d4a574] to-[#c9944a] bg-clip-text text-transparent font-semibold"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Blog
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-serif text-balance bg-gradient-to-br from-white via-[#e0b584] to-[#d4a574] bg-clip-text text-transparent"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Power of Visual Storytelling
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

      {/* Featured Post */}
      <motion.section
        ref={featuredRef}
        className="px-6 pb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <Card
            className="overflow-hidden cursor-pointer group bg-gradient-to-br from-[#2d1810]/80 to-[#1a0f0a]/80 border-[#d4a574]/30 hover:border-[#d4a574] transition-all duration-500 shadow-2xl hover:shadow-[#d4a574]/20 relative backdrop-blur-sm"
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
                <motion.div 
                  className="w-full h-full" 
                  style={{ scale: featuredScale, opacity: featuredOpacity }}
                >
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
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
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#d4a574]/20 to-[#c9944a]/20 text-[#d4a574] text-xs font-semibold rounded-full w-fit mb-4 border border-[#d4a574]/30">
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-[#d4a574] to-[#c9944a] text-black hover:from-[#e0b584] hover:to-[#d4a574] shadow-lg shadow-[#d4a574]/50"
                      : "border-[#d4a574]/30 hover:border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574]/10 bg-transparent"
                  }`}
                >
                  {cat.label}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Posts Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <ScrollZoomCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                  onClick={() => setSelectedPost(post.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 px-6 bg-gradient-to-br from-[#2d1810] via-[#1a0f0a] to-[#2d1810] text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Animated Gold Orbs */}
        <motion.div
          className="absolute top-1/2 -left-20 w-96 h-96 bg-[#d4a574]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-96 h-96 bg-[#c9944a]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Film Strip Effect */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.p
            className="text-sm uppercase tracking-widest bg-gradient-to-r from-[#d4a574] to-[#c9944a] bg-clip-text text-transparent font-semibold"
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
            Let's Capture Your <span className="bg-gradient-to-r from-[#d4a574] to-[#c9944a] bg-clip-text text-transparent">Story</span>
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
                className="bg-gradient-to-r from-[#d4a574] to-[#c9944a] hover:from-[#e0b584] hover:to-[#d4a574] text-black font-semibold transition-all duration-300 shadow-lg shadow-[#d4a574]/50"
              >
                <Link href="/booking">Book a Session</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#d4a574]/50 text-[#d4a574] hover:bg-[#d4a574]/10 bg-transparent hover:border-[#d4a574]"
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Post Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-[#2d1810] to-[#1a0f0a] border-[#d4a574]/50">
          {post && (
            <>
              <DialogHeader>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#d4a574]/20 to-[#c9944a]/20 text-[#d4a574] text-xs font-semibold rounded-full w-fit mb-2 border border-[#d4a574]/30">
                  {post.label}
                </span>
                <DialogTitle className="text-2xl font-serif bg-gradient-to-r from-white to-[#d4a574] bg-clip-text text-transparent">
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
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/60 to-transparent" />
              </div>
              <p className="text-gray-300 leading-relaxed">{post.content}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Scroll zoom component for blog cards
function ScrollZoomCard({ post, index, onClick }: { post: typeof posts[0]; index: number; onClick: () => void }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
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
        className="overflow-hidden cursor-pointer group h-full bg-gradient-to-br from-[#2d1810]/80 to-[#1a0f0a]/80 border-[#d4a574]/30 hover:border-[#d4a574] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4a574]/20 relative backdrop-blur-sm"
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
          <motion.div 
            className="w-full h-full"
            style={{ scale, opacity }}
          >
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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

          <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#d4a574] to-[#c9944a] text-black text-xs font-semibold rounded-full z-20 shadow-lg">
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