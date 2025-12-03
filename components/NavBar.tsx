"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLockBodyScroll } from "@/hooks/use-scroll"
import FloatingParticles from "./animated-golden-particles"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useLockBodyScroll(isOpen)

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
    const active = isActive(href)
    return (
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative">
        <Link
          href={href}
          onClick={onClick}
          className={`relative text-sm font-medium transition-all duration-300 ${
            active ? "text-gold font-semibold drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : "text-white/90 hover:text-gold"
          }`}
        >
          {children}
          {active && (
            <motion.div
              layoutId="activeLink"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/50 to-gold rounded-full"
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      </motion.div>
    )
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl shadow-2xl shadow-gold/20 border-b border-gold/20"
          : "bg-black/40 backdrop-blur-md border-b border-gold/10"
      }`}
    >
      <FloatingParticles />

      <div ref={menuRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 relative">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="relative w-8 h-8">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold to-gold/50 rounded-full blur-lg opacity-60 group-hover:opacity-100"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="relative w-8 h-8 bg-gradient-to-br from-gold to-gold/70 rounded-full flex items-center justify-center shadow-lg shadow-gold/40">
                  <span className="text-black font-serif text-lg font-bold">L</span>
                </div>
              </div>
              <span className="font-serif text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold/80 hidden sm:inline">
                Luminous
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center gap-1 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
            ].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              >
                <NavLink href={link.href}>{link.label}</NavLink>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-2 sm:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="hidden lg:inline-block px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 font-bold shadow-xl shadow-amber-500/30 border-2 border-black rounded-lg transition-all text-center text-sm"
              >
                Book Now
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <Button
                className="lg:hidden p-2 text-white/90 hover:text-gold transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                variant="ghost"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`lg:hidden overflow-hidden ${isOpen ? "mt-4 pb-4" : ""}`}
        >
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <motion.div
                key={link.href}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <NavLink href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="pt-2"
            >
              <Link
                href="/contact"
                className="block w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 font-bold shadow-xl shadow-amber-500/30 border-2 border-black rounded-lg transition-all text-center text-sm"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  )
}
