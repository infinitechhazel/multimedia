"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const NotFound = () => {
  const location = usePathname()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location)
  }, [location])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl">Oops! Page not found</p>
        <Link href="/" className="inline-block px-8 py-3 gold-glow text-primary font-semibold rounded-lg transition-all duration-200">
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
