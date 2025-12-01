"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const smoothTransition = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <Image src="/photography-studio-lights-professional.jpg" alt="" fill className="object-cover" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-4xl md:text-5xl font-light text-foreground mb-6"
          >
            Ready to Create Something Beautiful?
          </motion.h2>
          <motion.p variants={fadeInUp} transition={smoothTransition} className="text-muted-foreground text-lg mb-8">
            Let&apos;s discuss your vision and bring it to life through stunning photography and videography.
          </motion.p>
          <motion.div variants={fadeInUp} transition={smoothTransition}>
            <Link href="/booking">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
