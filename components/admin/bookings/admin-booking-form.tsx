"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"

interface Booking {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  date: string
  time: string
  guests: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  message: string
  approved?: boolean
}

interface BookingFormDialogProps {
  open: boolean
  setOpen: (val: boolean) => void
  initialData?: Partial<Booking>
  onSubmit: (data: Booking) => void
}

export function BookingFormDialog({ open, setOpen, initialData, onSubmit }: BookingFormDialogProps) {
  const services = ["Wedding Photography", "Portrait Session", "Event Photography", "Product Photography", "Commercial Photography", "Studio Rental"]

  const [formData, setFormData] = useState<Partial<Booking>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "Wedding Photography",
    date: "",
    time: "",
    guests: "1",
    status: "pending",
    message: "",
  })

  useEffect(() => {
    if (initialData) setFormData(initialData)
  }, [initialData])

  const handleSubmit = () => {
    onSubmit(formData as Booking)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl text-black">
        <DialogHeader>
          <DialogTitle className="text-accent">{initialData ? "Edit Booking" : "Add Booking"}</DialogTitle>
          <DialogDescription >{initialData ? "Update booking information." : "Create a new booking entry."}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-black">First Name</Label>
              <Input className="text-black" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Last Name</Label>
              <Input className="text-black" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Email</Label>
              <Input className="text-black" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Phone</Label>
              <Input className="text-black" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Service</Label>
              <select
                className="w-full h-10 px-3  border border-border rounded-md bg-background"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              >
                {services.map((s) => (
                  <option key={s} value={s} className="text-black">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-black">Date</Label>
              <Input className="text-black" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Time</Label>
              <Input className="text-black" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Guests</Label>
              <Input className="text-black" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} />
            </div>
            <div>
              <Label className="text-black">Status</Label>
              <select
                className="w-full h-10 px-3 text-black border border-border rounded-md bg-background"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Booking["status"] })}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div>
            <Label className="text-black">Message</Label>
            <Textarea className="text-black" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="text-black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gold hover:bg-gold/90 text-primary-foreground">
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
