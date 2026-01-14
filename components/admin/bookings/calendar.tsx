"use client"
import { useEffect, useMemo, useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns"
import { ChevronLeft, ChevronRight, Eye, MoreVertical, Pencil, Search, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookingViewDialog } from "./admin-view-booking"
import { BookingFormDialog } from "./admin-booking-form"
import { BookingDeleteDialog } from "./admin-delete-booking"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

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
}

interface CalendarBookingsProps {
  bookings: Booking[]
  search?: string
  onSearchChange?: (val: string) => void
  onRefetch: () => Promise<void>
}

export function CalendarBookings({ bookings, search, onSearchChange, onRefetch }: CalendarBookingsProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedItem, setSelectedItem] = useState<Booking | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const daysInMonth = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    })
  }, [currentMonth])

  const startPadding = getDay(startOfMonth(currentMonth))

  const filteredBookings = useMemo(() => {
    if (!search) return bookings
    return bookings.filter((b) => `${b.firstName} ${b.lastName} ${b.email} ${b.serviceType}`.toLowerCase().includes(search.toLowerCase()))
  }, [bookings, search])

  useEffect(() => {}, [bookings, search, selectedItem])

  const bookingsByDay = (day: Date) => filteredBookings.filter((b) => format(new Date(b.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))

  const statusStyles: Record<Booking["status"], string> = {
    pending: "bg-yellow-500/10 text-yellow-700",
    confirmed: "bg-blue-500/10 text-blue-700",
    completed: "bg-green-500/10 text-green-700",
    cancelled: "bg-red-500/10 text-red-700",
  }

  const openView = (booking: Booking) => {
    setSelectedItem(booking)
    setIsViewOpen(true)
  }

  const openEdit = (booking: Booking) => {
    setSelectedItem(booking)
    setIsEditOpen(true)
  }

  const openDelete = (booking: Booking) => {
    setSelectedItem(booking)
    setIsDeleteOpen(true)
  }

  const handleEdit = async (formData: Booking) => {
    if (!selectedItem) return
    setLoading(true)

    try {
      const res = await fetch(`/api/admin/bookings/${selectedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const dataJson = await res.json()

      if (!res.ok) {
        toast.error(dataJson.message || "Failed to update booking", { position: "top-right" })
        return
      }
      setIsEditOpen(false)
      setSelectedItem(null)
      await onRefetch()
      toast.success(dataJson.message, { position: "top-right" })
      
    } catch (err) {
      console.error(err)
      toast.error("Failed to update booking", { position: "top-right" })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    try {
      setLoading(true)

      const res = await fetch(`/api/admin/bookings/${selectedItem.id}`, {
        method: "DELETE",
      })

      const dataJson = await res.json()

      if (!res.ok) {
        toast.error("Error", { description: dataJson.message, position: "top-right" })
        return
      }

      setIsDeleteOpen(false)
      setSelectedItem(null)
      await onRefetch()
      toast.success("Success", { description: "Booking deleted successfully.", position: "top-right" })
    } catch (err) {
      console.error(err)
      toast.error("Error", { description: "Failed to delete booking.", position: "top-right" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Month Controls */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>

        <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map((day: any) => {
          const dayBookings = bookingsByDay(day)

          return (
            <div className="min-h-[130px] rounded-lg border border-border p-2 hover:bg-muted/30">
              <div className="text-sm font-semibold mb-2">{format(day, "d")}</div>

              <div className="space-y-1">
                {dayBookings.length ? (
                  dayBookings.map((booking) => (
                    <div className="flex items-center justify-between w-full rounded text-xs transition">
                      {/* Booking button */}
                      <button
                        key={booking.id}
                        onClick={() => {
                          setSelectedItem(booking)
                          setIsViewOpen(true)
                        }}
                        className={`flex flex-col text-left truncate ${statusStyles[booking.status]} flex-1`}
                      >
                        <div className="font-medium">
                          {booking.time} · {booking.firstName} {booking.lastName}
                        </div>
                        <div className="opacity-70 truncate">{booking.serviceType}</div>
                      </button>

                      {/* Dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded hover:bg-black/5 ml-2">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem onClick={() => openView(booking)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => openEdit(booking)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => openDelete(booking)} className="text-red-600">
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No bookings</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dialogs */}
      <BookingViewDialog open={isViewOpen} setOpen={setIsViewOpen} booking={selectedItem} />
      <BookingFormDialog open={isEditOpen} setOpen={setIsEditOpen} initialData={selectedItem!} onSubmit={handleEdit} />
      <BookingDeleteDialog open={isDeleteOpen} setOpen={setIsDeleteOpen} onDelete={handleDelete} />
    </div>
  )
}
