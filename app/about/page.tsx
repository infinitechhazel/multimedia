"use client"
import { Card } from "@/components/ui/card"
import { Award, Camera, Heart, Palette, Users, Zap, Sparkles, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const values = [
  {
    icon: Camera,
    title: "Artistic Excellence",
    description: "Unique artistic vision creating meaningful, beautiful images.",
  },
  {
    icon: Award,
    title: "Professional Quality",
    description: "Highest standards of professional photography guaranteed.",
  },
  {
    icon: Heart,
    title: "Personal Connection",
    description: "Understanding your story, creating collaborative experiences.",
  },
  {
    icon: Users,
    title: "Client Commitment",
    description: "Your satisfaction is priority. Expectations exceeded.",
  },
]

const teamMembers = [
  {
    name: "Alexandra Sterling",
    role: "Founder & Creative Director",
    specialty: "Weddings & Portraits",
    image: "/professional-woman-photographer.png",
    bio: "Visionary leader documenting life's meaningful moments for over a decade.",
  },
  {
    name: "Marcus Davidson",
    role: "Lead Photographer",
    specialty: "Events & Commercial",
    image: "/professional-photographer.png",
    bio: "Unmatched energy and attention to detail in every project.",
  },
  {
    name: "Elena Vasquez",
    role: "Portrait Specialist",
    specialty: "Studio Portraits & Fashion",
    image: "/professional-latina-woman-photographer-portrait.jpg",
    bio: "High-end portrait and fashion, merging precision with creative expression.",
  },
  {
    name: "James Liu",
    role: "Product & Commercial",
    specialty: "Product & E-commerce",
    image: "/professional-asian-man-photographer-portrait.jpg",
    bio: "Refined, technical mindset that elevates brands.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}

export default function About() {
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  })
  
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  })

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"])
  const storyY = useTransform(storyProgress, [0, 1], ["-20%", "20%"])

  return (
    <div className="min-h-screen pt-16 bg-black">
      {/* Animated golden particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(40)].map((_, i) => {
          const size = 1 + Math.random() * 4
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: "radial-gradient(circle, #FFD700, #FFA500)",
                boxShadow: `0 0 ${size * 6}px #FFD700`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="pt-16 pb-12 px-4 relative overflow-hidden" 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            y: heroY, 
            background: "radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.3), transparent 60%)" 
          }}
        />
        
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <motion.div
            className="inline-block"
            variants={scaleIn}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="inline-block h-6 w-6 mb-2" style={{ color: "#FFD700" }} />
          </motion.div>
          
          <motion.p
            className="text-xs uppercase tracking-[0.3em] font-bold"
            style={{ 
              background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.p>
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-serif text-white leading-tight"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            A Legacy of{" "}
            <motion.span
              style={{ 
                background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700, #FF8C00)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Excellence
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            Creating exceptional photography that tells your unique story with elegance, artistry, and professionalism.
          </motion.p>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        ref={storyRef}
        className="py-12 px-4 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ 
            y: storyY,
            background: "radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.4), transparent 60%)"
          }}
        />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div className="text-center mb-8" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Story
            </motion.h2>
            <motion.div
              className="h-0.5 w-20 mx-auto"
              style={{ background: "linear-gradient(to right, #FFD700, #FFA500)" }}
              variants={scaleIn}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="space-y-4 text-base leading-relaxed text-gray-300"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} transition={{ duration: 0.5 }}>
              Founded with passion for capturing life's precious moments, our studio has grown into a premier destination for professional photography. Over a decade of experience documenting countless weddings, portraits, and special events.
            </motion.p>
            <motion.p variants={fadeInUp} transition={{ duration: 0.5 }}>
              Our journey began with a simple belief: every moment deserves to be preserved beautifully. This philosophy drives everything we do, from initial consultation to final delivery.
            </motion.p>
            <motion.p variants={fadeInUp} transition={{ duration: 0.5 }}>
              We blend technical expertise with artistic vision. We don't just take photos—we create visual stories you'll treasure for generations.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-12 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              variants={fadeInUp}
            >
              Our Values
            </motion.h2>
            <motion.div
              className="h-0.5 w-20 mx-auto mb-4"
              style={{ background: "linear-gradient(to right, #FFD700, #FFA500)" }}
              variants={scaleIn}
            />
            <motion.p className="text-sm text-gray-400" variants={fadeInUp}>
              Principles guiding our work and client relationships
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Card 
                  className="p-6 text-center h-full transition-all duration-300 border-2 relative overflow-hidden group"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderColor: "rgba(255, 215, 0, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FFD700"
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                    e.currentTarget.style.boxShadow = "0 10px 40px rgba(255, 215, 0, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)"
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent)",
                    }}
                  />
                  
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    className="relative z-10"
                  >
                    <value.icon className="h-10 w-10 mx-auto mb-3" style={{ color: "#FFD700" }} />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2 text-white relative z-10">{value.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed relative z-10">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <motion.section
        className="py-12 px-4 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ 
            background: "radial-gradient(circle at 80% 50%, rgba(255, 165, 0, 0.4), transparent 60%)"
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Experience
            </h2>
            <div className="h-0.5 w-20 mx-auto" style={{ background: "linear-gradient(to right, #FFD700, #FFA500)" }} />
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" variants={staggerContainer}>
            {[
              { number: "10+", label: "Years", desc: "Decade of capturing moments", icon: Award },
              { number: "500+", label: "Happy Clients", desc: "Satisfied customers", icon: Users },
              { number: "50K+", label: "Photos Taken", desc: "Memories preserved", icon: Camera },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border-2 relative overflow-hidden group"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderColor: "rgba(255, 215, 0, 0.3)",
                }}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  borderColor: "#FFD700",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  boxShadow: "0 15px 50px rgba(255, 215, 0, 0.4)"
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.15), transparent)",
                  }}
                />
                
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, scale: 0.3, rotate: -45 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 150 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-2" style={{ color: "#FFD700" }} />
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{
                      background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-base font-semibold mb-1 text-white">{stat.label}</div>
                  <p className="text-gray-400 text-xs">{stat.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Studio Section */}
      <section className="py-12 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8 space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.3em] font-bold"
              style={{ color: "#FFD700" }}
              variants={fadeInUp}
            >
              Our Creative Space
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              variants={fadeInUp}
            >
              The Luminous Studio
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-base text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Our studio is thoughtfully designed to spark creativity and support every artistic vision.
            </motion.p>

            <motion.div className="grid md:grid-cols-3 gap-4" variants={staggerContainer}>
              {[
                {
                  icon: Camera,
                  title: "Professional Equipment",
                  desc: "Industry-leading cameras, lenses, and lighting systems.",
                },
                {
                  icon: Zap,
                  title: "Production Capabilities",
                  desc: "Editing workstations with industry-standard software.",
                },
                {
                  icon: Palette,
                  title: "Creative Environment",
                  desc: "Multiple backdrops, infinity coves, natural light studios.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl transition-all duration-300 border-2 relative overflow-hidden group"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderColor: "rgba(255, 215, 0, 0.3)",
                  }}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    borderColor: "#FFD700",
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    boxShadow: "0 10px 40px rgba(255, 215, 0, 0.3)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent)",
                    }}
                  />
                  
                  <motion.div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative z-10"
                    style={{ backgroundColor: "rgba(255, 215, 0, 0.2)" }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="h-6 w-6" style={{ color: "#FFD700" }} />
                  </motion.div>
                  <h3 className="font-serif font-bold text-lg mb-2 text-white relative z-10">{item.title}</h3>
                  <p className="text-gray-400 text-xs relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.3em] font-bold"
              style={{ color: "#FFD700" }}
              variants={fadeInUp}
            >
              Meet Our Team
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              variants={fadeInUp}
            >
              Exceptional Photographers
            </motion.h2>
            <motion.p className="text-sm text-gray-300" variants={fadeInUp}>
              Talented team bringing diverse expertise to every project.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group rounded-xl overflow-hidden transition-all duration-300 border-2 relative"
                style={{
                  borderColor: "rgba(255, 215, 0, 0.3)",
                  backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  borderColor: "#FFD700",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  boxShadow: "0 15px 50px rgba(255, 215, 0, 0.4)"
                }}
              >
                <div className="relative h-56 overflow-hidden bg-black">
                  <motion.div 
                    className="w-full h-full" 
                    whileHover={{ scale: 1.1, rotate: 1 }} 
                    transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
                  >
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0"
                    style={{ 
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent, transparent)",
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-5 space-y-2">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">{member.name}</h3>
                    <p className="text-xs uppercase tracking-widest font-bold" style={{ color: "#FFD700" }}>
                      {member.role}
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    {member.specialty}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="absolute top-1/2 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(255, 215, 0, 0.3)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.h2
            className="text-3xl md:text-5xl font-bold font-serif"
            variants={fadeInUp}
          >
            <span className="text-white">Let's Create Something </span>
            <motion.span 
              style={{ 
                background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700, #FF8C00)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Beautiful
            </motion.span>
          </motion.h2>
          <motion.p className="text-base text-gray-300 max-w-2xl mx-auto" variants={fadeInUp}>
            Ready to work with our team? Let's discuss your vision and bring it to life.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 font-bold rounded-lg transition-all duration-300 text-black uppercase text-sm tracking-wider relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                boxShadow: "0 5px 30px rgba(255, 215, 0, 0.5)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 10px 50px rgba(255, 215, 0, 0.7)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)"
                e.currentTarget.style.boxShadow = "0 5px 30px rgba(255, 215, 0, 0.5)"
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}