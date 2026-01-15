"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Booking } from "@/lib/types/types"

interface BookingViewDialogProps {
  open: boolean
  setOpen: (val: boolean) => void
  booking: Booking | null
}

export function BookingViewDialog({ open, setOpen, booking }: BookingViewDialogProps) {
  if (!booking) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-black max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-accent">Booking Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-medium">{booking.firstName} {booking.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{booking.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{booking.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">{booking.serviceType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{booking.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium">{booking.time}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Guests</p>
              <p className="font-medium">{booking.guests}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge>{booking.status}</Badge>
            </div>
          </div>
          {booking.message && (
            <div>
              <p className="text-sm text-muted-foreground">Message</p>
              <p className="font-medium">{booking.message}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
