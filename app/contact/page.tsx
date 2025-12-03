"use client"
import CommonQuestions from "@/components/common-questions"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-device"
import { labels } from "@/lib/constants"
import { AnimatePresence, motion } from "motion/react"
import FloatingParticles from "@/components/animated-golden-particles"
import { useInView } from "react-intersection-observer"
import { PhotographySuccessAnimation } from "@/components/successful-booking-animation"
import { formatDisplayTime, formatFullDate } from "@/lib/utils"

interface TimeSlot {
  raw: string // "24-hour format"
  display: string // "12-hour format"
  available: boolean
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  customService: string
  date: string
  time: string
  guests: string
  message: string
}

const allTimes = ["09:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [bookedDates, setBookedDates] = useState<{ date: string; time: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    customService: "",
    date: "",
    time: "",
    guests: "1",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const isMobile = useIsMobile()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [prevStep, setPrevStep] = useState(step)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  const fetchBookedDates = async () => {
    try {
      const res = await fetch("/api/bookings")
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
      const data = await res.json()
      setBookedDates(data)
    } catch (err) {
      console.error("Error fetching booked dates:", err)
    } finally {
      setLoading(false)
    }
  }

  const getTimeSlots = (date: string): TimeSlot[] => {
    if (!date) return []

    const bookedTimes = bookedDates.filter((b) => b.date === date).flatMap((b) => (Array.isArray(b.time) ? b.time : [b.time]))

    return allTimes.map((time) => ({
      raw: time,
      display: formatDisplayTime(time),
      available: !bookedTimes.includes(time),
    }))
  }

  const timeSlots = getTimeSlots(formData.date)

  // Get calendar days
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const isPastDate = (day: number | null) => {
    if (!day) return false

    const today = new Date()
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

    today.setHours(0, 0, 0, 0)

    return checkDate < today
  }

  const isDateBooked = (day: number | null, currentDate: Date): boolean => {
    if (day === null) return false

    const key = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    const bookedTimes = bookedDates.filter((b) => b.date === key).flatMap((b) => (Array.isArray(b.time) ? b.time : [b.time]))

    return bookedTimes.length >= allTimes.length
  }

  const isDateSelected = (day: number | null) => {
    return (
      selectedDate &&
      day &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const handleDateSelect = (selectedDay: number | null) => {
    if (!selectedDay) return

    if (isDateBooked(selectedDay, currentDate)) return

    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)

    setSelectedDate(newDate)

    setFormData((prev) => ({
      ...prev,
      date: newDate.toLocaleDateString("en-CA"), // formatted YYYY-MM-DD
      time: "",
    }))
  }

  const handleTimeSelect = (slot: TimeSlot) => {
    setFormData((prev) => ({
      ...prev,
      time: slot.raw,
    }))
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<FormData> = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email required"
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Valid email required"
      }
    }

    if (currentStep === 2) {
      if (!formData.serviceType) newErrors.serviceType = "Service type required"
      if (formData.serviceType === "others" && !formData.customService.trim()) {
        newErrors.customService = "Please specify your service"
      }
    }

    if (currentStep === 3) {
      if (!formData.date) newErrors.date = "Date required"
      if (!formData.time) newErrors.time = "Time required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 11)
      setFormData((prev) => ({
        ...prev,
        phone: cleaned,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "serviceType" && value !== "others" ? { customService: "" } : {}),
      }))
    }

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step !== 4) return

    const payload = {
      ...formData,
      serviceType: formData.serviceType === "others" ? formData.customService : formData.serviceType,
    }

    try {
      setIsSubmitting(true)

      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      let bookingData: any = null
      if (bookingRes.ok) {
        await fetchBookedDates()
        bookingData = await bookingRes.json()
      } else {
        const errorText = await bookingRes.text()
        console.error("Booking error:", bookingRes.status, errorText)
      }

      let emailData: any = null
      if (bookingRes.ok) {
        const emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (emailRes.ok) {
          emailData = await emailRes.json()
        } else {
          const errorText = await emailRes.text()
          console.error("Email error:", emailRes.status, errorText)
        }
      }

      if (bookingRes.ok && emailData?.success) {
        setSubmitted(true)
        setErrors({ email: "", phone: "", date: "", time: "" })
      } else {
        toast.error("Failed to send message", {
          description: "Please try again later.",
          position: "top-right",
          duration: 5000,
        })
      }
    } catch (err) {
      toast.error("Unexpected error", {
        description: "Something went wrong. Please try again later.",
        position: "top-right",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(false)
      setStep(1)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceType: "",
        customService: "",
        date: "",
        time: "",
        guests: "1",
        message: "",
      })
    }, 3000)
  }

  const days = getDaysArray()
  const monthName = currentDate.toLocaleDateString("en-CA", { month: "long", year: "numeric" })

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Find the first input that has an error
      const firstErrorField = Object.keys(errors)[0]
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${firstErrorField}"]`)
      if (el) {
        el.focus()
      }
    }
  }, [errors])

  const direction = step > prevStep ? "forward" : "backward"

  const apertureBlades = 8

  useEffect(() => {
    fetchBookedDates()
  }, [])

  useEffect(() => {
    setPrevStep(step)
  }, [step])

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <motion.section
        className="py-24 md:py-32 px-6 relative z-10 min-h-[50vh] flex items-center bg-gradient-to-br from-black via-black to-amber-950"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 w-full">
          <motion.p className="text-xs md:text-sm uppercase tracking-widest text-amber-500 font-semibold" variants={itemVariants}>
            Book Your Session
          </motion.p>

          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight" variants={itemVariants}>
            Let's Create Something <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">Beautiful</span>
          </motion.h1>

          <motion.p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
            Schedule your photography session or reach out with questions. We look forward to capturing moments that tell your story.
          </motion.p>
        </div>
      </motion.section>

      <section ref={ref} className="py-10 px-6">
        <div className="absolute  bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1408]" />
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          {/* Aperture rings - left */}
          <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-50">
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              initial={{ rotate: 0, opacity: 0 }}
              whileInView={{ rotate: 15, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {[...Array(apertureBlades)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M100,100 L${100 + 80 * Math.cos((i * 2 * Math.PI) / apertureBlades)},${
                    100 + 80 * Math.sin((i * 2 * Math.PI) / apertureBlades)
                  } A80,80 0 0,1 ${100 + 80 * Math.cos(((i + 1) * 2 * Math.PI) / apertureBlades)},${
                    100 + 80 * Math.sin(((i + 1) * 2 * Math.PI) / apertureBlades)
                  } Z`}
                  fill="none"
                  stroke="hsl(43 96% 56%)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))}
              <circle cx="100" cy="100" r="40" fill="none" stroke="hsl(43 96% 56%)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(43 96% 56%)" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="hsl(43 96% 56%)" strokeWidth="0.3" />
            </motion.svg>
          </div>

          {/* Aperture rings - right */}
          <div className="absolute right-[-5%] bottom-[10%] w-[300px] h-[300px] opacity-50">
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              initial={{ rotate: 0, opacity: 0 }}
              whileInView={{ rotate: -10, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              {[...Array(6)].map((_, i) => (
                <circle key={i} cx="100" cy="100" r={30 + i * 12} fill="none" stroke="hsl(43 96% 56%)" strokeWidth="0.5" />
              ))}
            </motion.svg>
          </div>

          {/* Flare top-right */}
          <motion.div
            className="absolute top-[20%] right-[20%] w-32 h-32 pointer-events-none z-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: "radial-gradient(circle, rgba(212,165,116,0.2), rgba(212,165,116,0.05), transparent)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: "rgba(212,165,116,0.6)" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
          </motion.div>

          {/* Flare bottom-left */}
          <motion.div
            className="absolute bottom-[15%] left-[15%] w-24 h-24 pointer-events-none z-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: "radial-gradient(circle, rgba(212,165,116,0.25), rgba(212,165,116,0.1), transparent)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: "rgba(212,165,116,0.6)" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="mb-12 mx-auto">
              <div className="flex items-center justify-between mb-8 mx-auto">
                {[1, 2, 3, 4].map((stepNum) => {
                  const isActive = stepNum <= step
                  const wasActive = stepNum <= prevStep

                  return (
                    <div key={stepNum} className="flex items-center flex-1">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isActive ? 1.2 : 0.9,
                          opacity: isActive ? 1 : 0.4,
                          boxShadow: isActive ? "0 0 16px rgba(255, 215, 0, 0.6)" : "0 0 0px rgba(0,0,0,0)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-300 ${
                          isActive ? "bg-gold text-black" : "bg-muted text-white border-2 border-border"
                        }`}
                      >
                        {stepNum}
                      </motion.div>

                      {stepNum < 4 && (
                        <div className="relative flex-1 h-1 mx-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={false}
                            animate={{
                              width: wasActive || isActive ? "100%" : "0%",
                            }}
                            transition={{
                              duration: 0.4,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-gold"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <motion.div
              className="bg-gradient-to-br from-slate-900/30 via-black to-black border border-amber-500/30 rounded-lg p-8 md:p-12 backdrop-blur-sm shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-3xl font-serif font-bold mb-6">Your Contact Information</h2>
                      <div className="h-1 w-24 bg-linear-to-r from-yellow-600 to-yellow-500 mb-8" />
                      <p className="text-gray-300 mb-8">Let's start with your details.</p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="flex flex-col md:flex-row gap-6"
                    >
                      <div className="flex-1">
                        <label className="block text-sm font-semibold mb-2 text-white capitalize">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-amber-500/10 border focus:bg-amber-500/10 border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors ${
                            errors.firstName ? "border-red-500" : "border border-amber-500/30"
                          }`}
                          placeholder="John"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-semibold mb-2 text-white capitalize">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-amber-500/10 focus:bg-amber-500/10 border border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold mb-2 text-white capitalize">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-amber-500/10 focus:bg-amber-500/10 border border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors ${
                          errors.email ? "border-red-500" : "border border-amber-500/30"
                        }`}
                        placeholder="your@email.com"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold mb-2 text-white capitalize">Phone Number</label>
                      <motion.input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-amber-500/10 focus:bg-amber-500/10 border border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                        placeholder="(+63) 912 345 6789"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </div>
                )}

                {/* Step 2: Service Selection */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-3xl font-serif font-bold mb-6">Select Your Service</h2>
                      <div className="h-1 w-24 bg-linear-to-r from-yellow-600 to-yellow-500 mb-8" />
                      <p className="text-white mb-8">What type of photography service do you need?</p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="relative"
                    >
                      <label className="block text-sm font-semibold mb-2 text-white">
                        Service Type <span className="text-red-500">*</span>
                        <motion.select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 mt-2 appearance-none font-normal bg-amber-500/10 focus:bg-amber-500/10 border border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors focus:ring-2 focus:ring-gold ${
                            errors.serviceType ? "border-red-500" : "border border-amber-500/30"
                          }`}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          <option value="wedding">Wedding Photography</option>
                          <option value="portrait">Portrait Session</option>
                          <option value="event">Event Photography</option>
                          <option value="product">Product Photography</option>
                          <option value="commercial">Commercial Photography</option>
                          <option value="studio">Studio Rental</option>
                          <option value="others">Others</option>
                        </motion.select>
                        <div
                          className={`pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 ${
                            formData.serviceType === "others" ? "mb-14" : "mt-0"
                          }`}
                        >
                          <svg className="mt-6 h-5 w-5 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {formData.serviceType === "others" && (
                          <motion.input
                            type="text"
                            name="customService"
                            placeholder="Please specify your service"
                            value={formData.customService}
                            required
                            onChange={handleChange}
                            className={`mt-3 w-full px-4 py-3 font-normal bg-amber-500/10 focus:bg-amber-500/10 border border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors focus:ring-2 focus:ring-gold ${
                              errors.customService ? "border-red-500" : "border border-amber-500/30"
                            }`}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </label>
                      {errors.customService && <p className="text-red-500 text-sm mt-1">{errors.customService}</p>}
                      {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="relative"
                    >
                      <label className="block text-sm font-semibold mb-2 text-white">
                        Number of People
                        <motion.select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full px-4 py-3 mt-2 appearance-none font-normal bg-amber-500/10 focus:bg-amber-500/10 border border-amber-500/30 rounded text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors focus:ring-2 focus:ring-gold"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <option value="1">1 person</option>
                          <option value="2">2 people</option>
                          <option value="3-5">3-5 people</option>
                          <option value="6-10">6-10 people</option>
                          <option value="10+">10+ people</option>
                        </motion.select>
                      </label>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        <svg className="mt-6 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Step 3: Date & Time with Calendar */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-3xl font-serif font-bold mb-6">Choose Your Date & Time</h2>
                      <div className="h-1 w-24 bg-gradient-to-r from-yellow-600 to-yellow-500 mb-8" />
                      <p className="text-gray-300 mb-8">Select your preferred session time from our available slots.</p>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <div className="p-8 rounded-2xl border border-gold/30 shadow-xl shadow-gold/10 hover:shadow-gold/20 transition-all duration-300">
                        {/* Month Header */}
                        <div className="flex items-center justify-between mb-8">
                          <Button onClick={handlePrevMonth} className="p-2 hover:bg-gold/10 rounded-lg transition-colors duration-200">
                            <ChevronLeft className="w-6 h-6 text-gold" />
                          </Button>
                          <h2 className="text-center md:text-2xl bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-[length:200%_200%] bg-clip-text text-transparent">
                            {monthName}
                          </h2>
                          <Button onClick={handleNextMonth} className="p-2 hover:bg-gold/10 rounded-lg transition-colors duration-200">
                            <ChevronRight className="w-6 h-6 text-gold" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="text-center font-semibold text-gold text-sm uppercase tracking-widest">
                              {isMobile ? day.charAt(0) : day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                          {/*  Skeleton Calendar when loading*/}
                          {loading
                            ? Array.from({ length: 28 }).map((_, i) => <div key={i} className="aspect-square rounded-lg bg-gray-700 animate-pulse" />)
                            : days.map((day, index) => {
                                const isBooked = isDateBooked(day || 0, currentDate) || (day ? isPastDate(day) : false)
                                const isSelected = day ? isDateSelected(day) : false

                                return (
                                  <motion.button
                                    key={index}
                                    onClick={() => day && !isBooked && handleDateSelect(day)}
                                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                    animate={{
                                      opacity: 1,
                                      scale: isSelected ? 1.15 : 1,
                                      y: 0,
                                    }}
                                    transition={{
                                      duration: 0.25,
                                      bounce: 0.25,
                                    }}
                                    whileHover={!isBooked && day ? { scale: 1.1 } : {}}
                                    whileTap={!isBooked && day ? { scale: 0.9 } : {}}
                                    className={`aspect-square rounded-lg font-semibold flex items-center justify-center text-sm transition-all duration-200 ${
                                      !day
                                        ? "invisible"
                                        : isBooked
                                        ? "bg-muted/50 text-white cursor-not-allowed opacity-50"
                                        : isSelected
                                        ? "bg-linear-to-br from-gold to-gold-dark text-black shadow-xl shadow-gold/20"
                                        : "bg-gold/10 hover:bg-gold/30 text-white hover:border hover:border-gold hover:shadow-lg hover:shadow-gold/30 border border-transparent"
                                    }`}
                                  >
                                    {day}
                                  </motion.button>
                                )
                              })}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gold/20 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gold/20 rounded"></div>
                            <span className="text-sm text-white">Available</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-linear-to-br from-gold to-gold-dark rounded border border-gold/30"></div>
                            <span className="text-sm text-white">Selected</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.date && <p className="text-red-500 text-sm w-full">{errors.date}</p>}

                    {formData.date && (
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={formData.date}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="animate-fadeIn"
                        >
                          <label className="block text-sm font-semibold mb-4 text-white">
                            Select a Time <span className="text-red-500">*</span>
                          </label>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {timeSlots.map((slot, index) => {
                              const isSelected = formatDisplayTime(formData.time) === slot.display
                              const isAvailable = slot.available

                              return (
                                <motion.button
                                  key={`${slot.display}-${isSelected}`}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => isAvailable && handleTimeSelect(slot)}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                  }}
                                  transition={{
                                    duration: 0.22,
                                    ease: "easeOut",
                                    delay: index * 0.03,
                                  }}
                                  whileHover={isAvailable ? { scale: 1.08 } : {}}
                                  className={`p-2 h-16 rounded-lg border-2 transition-all font-semibold text-center ${
                                    isSelected
                                      ? "border-gold bg-gold/10 text-gold shadow-gold/30 shadow-lg"
                                      : isAvailable
                                      ? "border-amber-500/20 bg-card text-white hover:border-gold cursor-pointer"
                                      : "border-amber-500/20 bg-gray-500/20 text-gray-700 cursor-not-allowed opacity-50"
                                  }`}
                                >
                                  <div>{slot.display}</div>
                                  {!isAvailable && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 0.7 }}
                                      transition={{ delay: 0.1 }}
                                      className="text-xs text-gray-700 mt-1"
                                    >
                                      Booked
                                    </motion.div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>

                          {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time}</p>}
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {formData.date && formData.time && (
                      <div className="bg-gold/10 border border-gold rounded-lg p-4 animate-fadeIn">
                        <p className="text-sm text-gray-300 mb-1">Selected Session</p>
                        <p className="font-semibold text-gray-300">
                          {formatFullDate(formData.date)} at {formatDisplayTime(formData.time)}
                        </p>
                      </div>
                    )}

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                      <label className="block text-sm font-semibold mb-2 text-white">Additional Details</label>

                      <motion.textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-amber-500/20 rounded-lg bg-card text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition resize-none h-32"
                        placeholder="Tell us more about your vision..."
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 12px rgba(245, 158, 11, 0.4)" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants}>
                      <h2 className="text-3xl font-serif font-bold mb-6">Review Your Booking</h2>
                      <motion.div variants={itemVariants} className="h-1 w-24 bg-gradient-to-r from-yellow-600 to-yellow-500 mb-8" />
                      <p className="mb-8 text-gray-300">Please review your information before submitting.</p>
                    </motion.div>

                    {/* Booking details */}
                    <motion.div variants={itemVariants} className="bg-gold/10 border border-gold rounded-lg p-6 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div variants={itemVariants}>
                          <p className="text-sm mb-1">Name</p>
                          <p className="font-semibold text-gold">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-sm mb-1">Email</p>
                          <p className="font-semibold text-gold line-clamp-1">{formData.email}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-sm mb-1">Phone</p>
                          <p className="font-semibold text-gold">{formData.phone || "Not provided"}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-sm mb-1">Service Type</p>
                          <p className="font-semibold capitalize text-gold">
                            {labels[formData.serviceType as keyof typeof labels] || formData.serviceType}
                          </p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-sm mb-1">Number of Guests</p>
                          <p className="font-semibold text-gold">{formData.guests}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-sm mb-1">Session Date & Time</p>
                          <p className="font-semibold text-gold">
                            {formatFullDate(formData.date)} at {formatDisplayTime(formData.time)}
                          </p>
                        </motion.div>
                      </div>

                      {formData.message && (
                        <motion.div variants={itemVariants} className="pt-4 border-t border-gold">
                          <p className="text-sm mb-1">Additional Details</p>
                          <p className="font-semibold text-gold line-clamp-3">{formData.message}</p>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Policy notice */}
                    <motion.div variants={itemVariants} className="bg-gold/10 border border-gold rounded-lg p-4">
                      <p className="text-sm">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gold underline">
                          privacy policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-gold underline">
                          terms of service
                        </Link>
                        .
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-8">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`flex-1 py-2 text-lg rounded-lg transition-all duration-200 ${
                      step === 1
                        ? "bg-muted text-black cursor-not-allowed"
                        : "border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black bg-black/50 backdrop-blur-sm font-bold"
                    }`}
                  >
                    Back
                  </motion.button>
                  {step === 4 ? (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/30 font-semibold text-lg rounded-lg hover:shadow-lg hover:shadow-gold/40 transition-all duration-200 active:scale-95"
                    >
                      {isMobile ? "Submit" : "Submit Booking"}
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/30 font-semibold text-lg rounded-lg hover:shadow-lg  transition-all duration-200  active:scale-95"
                    >
                      Next
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          {/* Success Message */}
          <PhotographySuccessAnimation isVisible={submitted} />
        </motion.section>

        <section className="z-50 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-3 my-20 text-center tracking-tight"
          >
            <h2 className="text-3xl font-serif font-bold">Get In Touch</h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full origin-left"
            />
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-3">Location</h3>
                <p className="text-lg font-serif font-semibold text-white">Luminous Studio</p>
                <p className="text-white leading-relaxed">
                  123 Creative Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-3">Phone</h3>
                <a href="tel:+12125551234" className="text-lg font-semibold text-white hover:text-gold transition-colors">
                  +1 (212) 555-1234
                </a>
                <p className="text-sm text-white">Monday - Friday, 8AM - 5PM</p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-3">Email</h3>
                <a href="mailto:hello@luminousstudio.com" className="text-lg font-semibold text-white hover:text-gold transition-colors">
                  hello@luminousstudio.com
                </a>
                <p className="text-sm text-white">We typically respond within 24 hours</p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3 pt-4">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold">Follow Us</h3>
                <div className="flex gap-4">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-3.51 10.02 10.02 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-gold">Visit Our Studio</h3>
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full h-64 rounded-lg overflow-hidden border border-border"
              >
                <iframe
                  src="https://www.google.com/maps/embed?...your-map-url..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
              <p className="text-sm text-gray-300">
                Located in the heart of New York's creative district. Easy street parking and public transportation nearby.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </section>
    </div>
  )
}
