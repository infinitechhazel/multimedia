"use client"
import { useState } from "react"

  const faqs = [
    {
      question: "What is your booking process?",
      answer:
        "Simply fill out the form above with your details and preferred date. We'll review your request and confirm within 24 hours. A deposit secures your booking.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 30+ days before the session receive a full refund. Cancellations within 30 days forfeit the deposit.",
    },
    {
      question: "Do you offer rush bookings?",
      answer: "Yes, rush bookings are available subject to schedule availability with an additional 25% rush fee.",
    },
    {
      question: "What types of photography services do you offer?",
      answer:
        "We offer a comprehensive range of photography services including weddings, portraits, events, product photography, and studio shoots. Each service is tailored to meet your specific needs and vision.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We require a 50% deposit to secure your booking. If you need to cancel, the deposit is non-refundable but can be applied to a future session within 12 months. Cancellations made less than 14 days before the session will forfeit the entire deposit.",
    },
    {
      question: "How long does it take to receive my photos?",
      answer:
        "Turnaround time varies by service. Portrait sessions are typically delivered within 2 weeks, events within 3-4 weeks, and weddings within 6-8 weeks. We'll provide you with a specific timeline when you book.",
    },
    {
      question: "Do you provide raw, unedited files?",
      answer:
        "We provide professionally edited, high-resolution images. Raw files are not included in standard packages as they require significant post-processing to look their best. However, we can discuss custom arrangements if you have specific needs.",
    },
    {
      question: "Can I purchase prints directly from you?",
      answer:
        "Yes! We offer professional printing services with various sizes and materials available. We work with premium labs to ensure the highest quality prints that will last for generations.",
    },
    {
      question: "Do you travel for destination shoots?",
      answer:
        "Absolutely! We love destination photography. Travel fees vary depending on location and duration. Contact us with your destination details and we'll provide a custom quote.",
    },
    {
      question: "What should I wear for my photo session?",
      answer:
        "We provide detailed styling guides when you book. Generally, we recommend wearing colors that complement your skin tone, avoiding busy patterns, and choosing outfits that make you feel confident and comfortable.",
    },
    {
      question: "Can I request specific shots or poses?",
      answer:
        "Of course! We encourage you to share your vision and any inspiration images. We'll work together to create a shot list that captures exactly what you're looking for while also providing our professional creative input.",
    },
    {
      question: "What happens if there's bad weather on my shoot day?",
      answer:
        "For outdoor sessions, we monitor weather closely. If conditions are unsuitable, we'll reschedule at no additional cost. For weddings and events, we always have backup plans and come prepared with equipment to work in various conditions.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible payment plans for larger packages. A 50% deposit is required to book, with the remaining balance due before or on the day of your session. Contact us to discuss payment options that work for you.",
    },
    {
      question: "Can I share my photos on social media?",
      answer:
        "Yes! We encourage you to share your photos on social media. We only ask that you tag us or provide credit when posting. All images remain under our copyright, but you have full personal usage rights.",
    },
  ]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our photography services, booking process, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <details
                key={index}
                open={openIndex === index}
                onClick={(e) => {
                  e.preventDefault()
                  setOpenIndex(openIndex === index ? null : index)
                }}
                className="my-3 group border border-gold/30 rounded-lg p-6 hover:border-gold transition-colors bg-gray-50"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground">
                  {faq.question}
                  <span className="ml-2 text-gold text-xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="h-0.5 w-full my-4 bg-linear-to-r from-yellow-600 to-yellow-500" />
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-linear-to-r from-slate-900 via-primary/95 to-slate-900 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              We're here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <a href="/contact" className="inline-block gold-glow px-8 py-3 rounded-lg font-semibold transition-smooth">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
