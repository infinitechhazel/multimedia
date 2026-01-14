import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import FloatingSocialIcons from "@/components/floating-social-media"
import Footer from "@/components/layout/Footer"
import { CameraCursorProvider } from "@/components/camera-cursor-provider"
import { Navigation } from "@/components/layout/NavBar"
import { PublicLayoutProvider } from "./providers/layout-context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Luminous Studio | Professional Photography",
  description:
    "Professional photography services for weddings, portraits, events, and products. Capturing your special moments with elegance and style.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <PublicLayoutProvider>
            {children}
            <Toaster />
          </PublicLayoutProvider>
      </body>
    </html>
  )
}
