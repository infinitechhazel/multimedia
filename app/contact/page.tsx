"use client"
import CommonQuestions from "@/components/common-questions"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { labels } from "@/lib/constants"

interface TimeSlot {
  time: string
  available: boolean
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  date: string
  time: string
  guests: string
  message: string
}

const allTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

const bookedDates = [
  { date: "2025-11-28", time: ["10:00 AM"] },
  { date: "2025-11-24", time: ["10:00 AM", "02:00 PM"] },
  { date: "2025-11-25", time: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"] },
  { date: "2025-11-30", time: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"] },
  { date: "2025-12-01", time: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"] },
  { date: "2025-12-11", time: ["10:00 AM"] },
  { date: "2025-12-21", time: ["10:00 AM"] },
  { date: "2025-12-22", time: ["09:00 AM"] },
  { date: "2025-12-23", time: ["10:00 AM"] },
  { date: "2025-12-24", time: ["10:00 AM"] },
  { date: "2025-12-25", time: ["10:00 AM"] },
  { date: "2025-12-26", time: ["10:00 AM"] },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    guests: "1",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const isMobile = useIsMobile()

  const getTimeSlots = (date: string): TimeSlot[] => {
    if (!date) return []

    const bookedTimes = bookedDates.filter((b) => b.date === date).flatMap((b) => (Array.isArray(b.time) ? b.time : [b.time]))

    return allTimes.map((time) => ({
      time,
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

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      time: time,
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

    try {
      setIsSubmitting(true)
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        toast.success("Message Sent!", {
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
          position: "top-right",
          duration: 5000,
        })

        setErrors({ email: "", phone: "", date: "", time: "" })
      } else {
        toast.error("Failed to send message", {
          description: "Please try again later.",
          position: "top-right",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
      toast.error("Something went wrong", {
        description: "Please try again later.",
        position: "top-right",
        duration: 5000,
      })
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-32 pb-6 px-6 bg-linear-to-b from-muted/30 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold">Book Your Session</p>
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-balance">Let's Create Something Beautiful</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            Schedule your photography session or reach out with questions. We look forward to working with you.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <section>
          <div className="max-w-2xl mx-auto">
            <div className="mb-12 mx-auto">
              <div className="flex items-center justify-between mb-8 mx-auto">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div key={stepNum} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        stepNum <= step ? "bg-gold text-primary" : "bg-muted text-muted-foreground border-2 border-border"
                      }`}
                    >
                      {stepNum}
                    </div>
                    {stepNum < 4 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${stepNum < step ? "bg-gold" : "bg-muted"}`}></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6">Your Contact Information</h2>
                    <div className="h-1 w-24 bg-linear-to-r from-yellow-600 to-yellow-500 mb-8" />
                    <p className="text-muted-foreground mb-8">Let's start with your details.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition ${
                          errors.firstName ? "border-red-500" : "border-border"
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition ${
                        errors.email ? "border-red-500" : "border-border"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition"
                      placeholder="(+63) 912 345 6789"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6">Select Your Service</h2>
                    <div className="h-1 w-24 bg-linear-to-r from-yellow-600 to-yellow-500 mb-8" />
                    <p className="text-muted-foreground mb-8">What type of photography service do you need?</p>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 appearance-none border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition ${
                        errors.serviceType ? "border-red-500" : "border-border"
                      }`}
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
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg className="mt-6 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 text-foreground">Number of People</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 appearance-none border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition"
                    >
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3-5">3-5 people</option>
                      <option value="6-10">6-10 people</option>
                      <option value="10+">10+ people</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg className="mt-6 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time with Calendar */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6">Choose Your Date & Time</h2>
                    <div className="h-1 w-24 bg-linear-to-r from-yellow-600 to-yellow-500 mb-8" />
                    <p className="text-muted-foreground mb-8">Select your preferred session time from our available slots.</p>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div className="p-8 rounded-2xl border border-gold/30 bg-card shadow-xl shadow-gold/10 hover:shadow-gold/20 transition-all duration-300">
                      {/* Month Header */}
                      <div className="flex items-center justify-between mb-8">
                        <Button onClick={handlePrevMonth} className="p-2 hover:bg-gold/10 rounded-lg transition-colors duration-200">
                          <ChevronLeft className="w-6 h-6 text-gold" />
                        </Button>
                        <h2 className="md:text-2xl text-sm font-serif font-bold gradient-text">{monthName}</h2>
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
                        {days.map((day, index) => {
                          const isBooked = isDateBooked(day, currentDate) || isPastDate(day)
                          const isSelected = isDateSelected(day)

                          return (
                            <button
                              key={index}
                              onClick={() => day && handleDateSelect(day)}
                              className={`aspect-square rounded-lg font-semibold transition-all duration-200 flex items-center justify-center text-sm ${
                                !day
                                  ? "invisible"
                                  : isBooked
                                  ? "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50"
                                  : isSelected
                                  ? "bg-linear-to-br from-gold to-gold-dark text-primary scale-110 shadow-xl shadow-gold/10"
                                  : "bg-gold/20 hover:bg-gold/20 hover:border hover:border-gold text-foreground hover:shadow-lg hover:shadow-gold/20 border border-transparent"
                              }`}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>

                      <div className="mt-8 pt-8 border-t border-gold/20 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gold/20 rounded"></div>
                          <span className="text-sm text-muted-foreground">Available</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-linear-to-br from-gold to-gold-dark rounded border border-gold/30 bg-card shadow-xl shadow-gold/10"></div>
                          <span className="text-sm text-muted-foreground">Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {errors.date && <p className="text-red-500 text-sm w-full">{errors.date}</p>}

                  {formData.date && (
                    <div className="animate-fadeIn">
                      <label className="block text-sm font-semibold mb-4 text-foreground">
                        Select a Time <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={`p-2 h-16 rounded-lg border-2 transition-all font-semibold text-center ${
                              formData.time === slot.time
                                ? "border-gold bg-gold/10 text-gold"
                                : slot.available
                                ? "border-border bg-card text-foreground hover:border-gold cursor-pointer"
                                : "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            }`}
                          >
                            <div>{slot.time}</div>
                            {!slot.available && <div className="text-xs text-muted-foreground mt-1">Booked</div>}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time}</p>}
                    </div>
                  )}

                  {formData.date && formData.time && (
                    <div className="bg-gold/10 border border-gold rounded-lg p-4 animate-fadeIn">
                      <p className="text-sm text-muted-foreground mb-1">Selected Session</p>
                      <p className="font-semibold text-foreground">
                        {new Date(formData.date).toLocaleDateString("en-CA", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {formData.time}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Additional Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition resize-none h-32"
                      placeholder="Tell us more about your vision..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6">Review Your Booking</h2>
                    <div className="h-1 w-24 bg-linear-to-r from-yellow-600 to-yellow-500 mb-8" />
                    <p className="mb-8">Please review your information before submitting.</p>
                  </div>

                  <div className="bg-gold/10 border border-gold rounded-lg p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-1">Name</p>
                        <p className="font-semibold text-gold">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Email</p>
                        <p className="font-semibold text-gold line-clamp-1">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Phone</p>
                        <p className="font-semibold text-gold">{formData.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Service Type</p>
                        <p className="font-semibold capitalize text-gold">
                          {labels[formData.serviceType as keyof typeof labels] || formData.serviceType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Number of Guests</p>
                        <p className="font-semibold text-gold">{formData.guests}</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Session Date & Time</p>
                        <p className="font-semibold text-gold">
                          {new Date(formData.date).toLocaleDateString("en-CA", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {formData.time}
                        </p>
                      </div>
                    </div>
                    {formData.message && (
                      <div className="pt-4 border-t border-gold">
                        <p className="text-sm mb-1">Additional Details</p>
                        <p className="font-semibold text-gold line-clamp-3">{formData.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gold/10 border border-gold rounded-lg p-4">
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
                  </div>
                </div>
              )}

              {/* Success Message */}
              {submitted && (
                <div className="p-4 bg-gold/10 border border-gold rounded-lg text-center">
                  <p className="text-gold font-semibold">Thank you! We'll be in touch shortly.</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-8">
                <Button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex-1 py-4 font-semibold text-lg rounded-lg transition-all duration-200 ${
                    step === 1 ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-muted text-foreground hover:bg-border"
                  }`}
                >
                  Back
                </Button>
                {step === 4 ? (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 gold-glow bg-gold text-primary font-semibold text-lg rounded-lg hover:shadow-lg hover:shadow-gold/40 transition-all duration-200 active:scale-95"
                  >
                    {isMobile ? "Submit" : "Submit Booking"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-4 gold-glow bg-gold text-primary font-semibold text-lg rounded-lg hover:shadow-lg  transition-all duration-200  active:scale-95"
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>

        <section>
          <div className="space-y-3 my-20 text-center">
            <h2 className="text-3xl font-serif font-bold">Get In Touch</h2>
            <div className="h-1 w-12 mx-auto bg-gold rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-3">Location</h3>
                <p className="text-lg font-serif font-semibold text-foreground">Luminous Studio</p>
                <p className="text-muted-foreground leading-relaxed">
                  123 Creative Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-3">Phone</h3>
                <a href="tel:+12125551234" className="text-lg font-semibold text-foreground hover:text-gold transition-colors">
                  +1 (212) 555-1234
                </a>
                <p className="text-sm text-muted-foreground">Monday - Friday, 8AM - 5PM</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-3">Email</h3>
                <a href="mailto:hello@luminousstudio.com" className="text-lg font-semibold text-foreground hover:text-gold transition-colors">
                  hello@luminousstudio.com
                </a>
                <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
              </div>

              {/* Social Links */}
              <div className="space-y-3 pt-4">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-gold">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-3.51 10.02 10.02 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Map */}
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-gold">Visit Our Studio</h3>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.12719!2d-74.00601!3d40.71282!2m3!1f0!2f0!3f0!3m2!1i1024!28!4f13.1!3m3!1m2!1s0x89c25a316bb7ae0f%3A0x6b8e63f0c2a6e8a!2s123%20Creative%20St%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Located in the heart of New York's creative district. Easy street parking and public transportation nearby.
              </p>
            </div>
          </div>
        </section>
      </section>

      <CommonQuestions />
    </div>
  )
}
