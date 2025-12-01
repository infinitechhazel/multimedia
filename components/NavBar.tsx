"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ChevronDownIcon, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLockBodyScroll } from "@/hooks/use-scroll"
import { Button } from "./ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useLockBodyScroll(isOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-lg border-b border-gold/30 shadow-lg shadow-gold/10"
          : "bg-background/95 backdrop-blur-sm border-b border-gold/20"
      } ${isOpen ? "fixed inset-0 z-50 backdrop-blur-sm" : ""}`}
    >
      <div ref={menuRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-linear-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-gold/40">
              <span className="text-primary font-serif text-lg font-bold">L</span>
            </div>
            <span className="font-serif text-lg font-bold text-foreground hidden sm:inline gradient-text">Luminous</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 lg:gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive("/") ? "text-gold font-semibold drop-shadow-lg shadow-gold/50" : "text-foreground hover:text-gold"
              }`}
            >
              Home
            </Link>

            <Link
              href="/portfolio"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive("/portfolio") ? "text-gold font-semibold drop-shadow-lg shadow-gold/50" : "text-foreground hover:text-gold"
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/services"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive("/services") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive("/about") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive("/blog") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
            >
              Blog
            </Link>
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-block px-4 lg:px-6 py-2 gold-glow text-primary font-semibold rounded-lg transition-all duration-200 text-sm whitespace-nowrap"
            >
              Book Now
            </Link>

            {/* Mobile Menu Button */}
            <Button
              className="lg:hidden p-2 z-100 text-foreground hover:text-gold transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className={`block text-sm font-medium transition-colors ${
                isActive("/") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Home
            </Link>

            <Link
              href="/portfolio"
              className={`block text-sm font-medium transition-colors ${
                isActive("/portfolio") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Portfolio
            </Link>

            <Link
              href="/services"
              className={`block text-sm font-medium transition-colors ${
                isActive("/services") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`block text-sm font-medium transition-colors ${
                isActive("/about") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`block text-sm font-medium transition-colors ${
                isActive("/blog") ? "text-gold font-semibold" : "text-foreground hover:text-gold"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block w-full mt-4 px-4 py-2 gold-glow text-primary font-semibold rounded-lg transition-all text-center text-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
