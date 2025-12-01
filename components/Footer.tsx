import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gold">STUDIO</h3>
            <p className="text-sm opacity-80">Capturing life's precious moments with artistic excellence and professional dedication.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-gold transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm hover:text-gold transition-smooth">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-gold transition-smooth">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-gold transition-smooth">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-gold transition-smooth">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone className="h-4 w-4 text-gold mt-0.5" />
                <a href="tel:+1 (555) 123-4567" className="text-sm hover:text-gold transition-smooth">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="h-4 w-4 text-gold mt-0.5" />
                <a href="mailto:info@studiophoto.com" className="text-sm hover:text-gold transition-smooth ">
                  info@studiophoto.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gold mt-0.5" />
                <span>
                  123 Photography Lane
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
            <div className="pt-2 space-y-1">
              <h4 className="text-sm font-semibold text-gold">Operating Hours</h4>
              <p className="text-sm">Mon - Fri: 9AM - 6PM</p>
              <p className="text-sm">Sat - Sun: By Appointment</p>
            </div>
          </div>

          {/* Social & Policies */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gold">Policies</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/privacy" className="text-sm hover:text-gold transition-smooth">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm hover:text-gold transition-smooth">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm hover:text-gold transition-smooth">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-12 pt-4 text-center">
          <p className="text-sm opacity-80">© {new Date().getFullYear()} Studio Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
