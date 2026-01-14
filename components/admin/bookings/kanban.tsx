"use client"

import { useState } from "react"
import { DndContext, DragEndEvent, closestCenter, useDroppable, useDraggable } from "@dnd-kit/core"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreVertical, Eye, Pencil, Trash } from "lucide-react"
import { toast } from "sonner"
import { BookingViewDialog } from "./admin-view-booking"
import { BookingFormDialog } from "./admin-booking-form"
import { BookingDeleteDialog } from "./admin-delete-booking"

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

interface KanbanBookingsProps {
  bookings: Booking[]
  onRefetch: () => Promise<void>
}

export function KanbanBookings({ bookings, onRefetch }: KanbanBookingsProps) {
  const [selectedItem, setSelectedItem] = useState<Booking | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const statusColumns: Record<Booking["status"], string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
  }

  // -----------------------
  // Draggable card
  // -----------------------
  function DraggableBooking({ booking }: { booking: Booking }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: booking.id,
      disabled: booking.status === "completed",
    })

    // Compute the transform style
    const style: React.CSSProperties = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition: "transform 200ms ease",
      cursor: booking.status === "completed" ? "not-allowed" : "grab",
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex items-center justify-between rounded p-2 bg-muted hover:bg-muted/70 text-xs"
      >
        <button onClick={() => setSelectedItem(booking) || setIsViewOpen(true)} className="flex-1 text-left truncate">
          <div className="font-medium">
            {booking.time} · {booking.firstName} {booking.lastName}
          </div>
          <div className="opacity-70 truncate">{booking.serviceType}</div>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-black/5 ml-2">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={() => setIsViewOpen(true)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  // -----------------------
  // Droppable column
  // -----------------------
  function DroppableColumn({ status, children }: { status: Booking["status"]; children: React.ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id: status })
    return (
      <div ref={setNodeRef} className={`flex-1 transition p-1 ${isOver ? "bg-blue-100/30" : ""}`}>
        {children}
      </div>
    )
  }

  // -----------------------
  // Drag end
  // -----------------------
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const bookingId = active.id as string
    const newStatus = over.id as Booking["status"]

    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return
    if (booking.status === newStatus) return

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")

      toast.success(`Booking moved to ${newStatus}`)
      await onRefetch()
    } catch (err) {
      console.error(err)
      toast.error("Error updating booking status")
    }
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(statusColumns).map(([status, label]) => {
            const items = bookings.filter((b) => b.status === status)
            return (
              <DroppableColumn key={status} status={status as Booking["status"]}>
                <Card className="bg-white flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 min-h-[120px]">
                    {items.length ? (
                      items.map((b) => <DraggableBooking key={b.id} booking={b} />)
                    ) : (
                      <span className="text-xs text-muted-foreground">Drop here</span>
                    )}
                  </CardContent>
                </Card>
              </DroppableColumn>
            )
          })}
        </div>
      </DndContext>

      <BookingViewDialog open={isViewOpen} setOpen={setIsViewOpen} booking={selectedItem} />
      <BookingFormDialog open={isEditOpen} setOpen={setIsEditOpen} initialData={selectedItem!} onSubmit={() => {}} />
      <BookingDeleteDialog open={isDeleteOpen} setOpen={setIsDeleteOpen} onDelete={() => {}} />
    </>
  )
}
