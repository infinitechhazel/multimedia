"use client"
import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"
import { DataTable } from "@/components/admin/data-table"
import { BookingViewDialog } from "@/components/admin/bookings/admin-view-booking"
import { BookingFormDialog } from "@/components/admin/bookings/admin-booking-form"
import { BookingDeleteDialog } from "@/components/admin/bookings/admin-delete-booking"

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

const AdminBookings = () => {
  const [data, setData] = useState<Booking[]>([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [approvedFilter, setApprovedFilter] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [totalPages, setTotalPages] = useState(1)
  const [globalFields, setGlobalFields] = useState<(keyof Booking)[]>(["firstName", "lastName", "email"])

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
    approved: false,
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams()
      query.append("page", (pageIndex + 1).toString())
      query.append("perPage", pageSize.toString())
      if (search) query.append("search", search)
      if (statusFilter) query.append("status", statusFilter)
      if (approvedFilter) query.append("approved", approvedFilter)
      query.append("sortBy", sortBy)
      query.append("sortOrder", sortOrder)

      const res = await fetch(`/api/admin/bookings?${query.toString()}`)
      const json = await res.json()
      console.log("API response:", json)
      const bookings = Array.isArray(json.data) ? json.data : json
      setData(bookings)
      setTotalPages(json.last_page ?? 1)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, pageIndex, pageSize, search, statusFilter, approvedFilter, sortBy, sortOrder])

  const handleAdd = async (formData: Booking) => {
    try {
      setLoading(true)

      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const dataJson = await res.json()

      if (!res.ok) {
        toast.error("Error", { description: dataJson.message, position: "top-right" })
        return
      }

      setData([dataJson.booking, ...data])
      setIsAddOpen(false)

      // reset form state
      setFormData({
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

      toast.success("Success", { description: "Booking added successfully.", position: "top-right" })
    } catch (err) {
      console.error(err)
      toast.error("Error", { description: "Failed to add booking.", position: "top-right" })
    } finally {
      setLoading(false)
    }
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

      setData((prev) => prev.map((item) => (item.id === selectedItem.id ? dataJson.booking : item)))

      setIsEditOpen(false)
      setSelectedItem(null)
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

      setData(data.filter((item) => item.id !== selectedItem.id))
      setIsDeleteOpen(false)
      setSelectedItem(null)

      toast.success("Success", { description: "Booking deleted successfully.", position: "top-right" })
    } catch (err) {
      console.error(err)
      toast.error("Error", { description: "Failed to delete booking.", position: "top-right" })
    } finally {
      setLoading(false)
    }
  }

  const openEdit = (item: Booking) => {
    setSelectedItem(item)
    setFormData({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      serviceType: item.serviceType,
      date: item.date,
      time: item.time,
      guests: item.guests,
      status: item.status,
      message: item.message,
    })
    setIsEditOpen(true)
  }

  const columns: ColumnDef<Booking>[] = [
    { accessorKey: "firstName", header: "First Name", enableSorting: true },
    { accessorKey: "lastName", header: "Last Name", enableSorting: true },
    { accessorKey: "email", header: "Email", enableSorting: true },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "serviceType", header: "Service", enableSorting: true },
    { accessorKey: "date", header: "Date", enableSorting: true },
    { accessorKey: "time", header: "Time" },
    { accessorKey: "guest", header: "Guest" },
    { accessorKey: "messsage", header: "Message" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "confirmed"
              ? "default"
              : row.original.status === "completed"
              ? "secondary"
              : row.original.status === "cancelled"
              ? "destructive"
              : "outline"
          }
        >
          {row.original.status}
        </Badge>
      ),
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedItem(row.original)
                setIsViewOpen(true)
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEdit(row.original)}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedItem(row.original)
                setIsDeleteOpen(true)
              }}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage client bookings and appointments.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="bg-gold hover:bg-gold/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Booking
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        pageCount={totalPages} // from Laravel's last_page
        pageIndex={pageIndex} // local state
        pageSize={pageSize} // local state
        onPageChange={(pi, ps) => {
          setPageIndex(pi)
          setPageSize(ps)
          fetchData() // trigger backend fetch
        }}
        searchFields={globalFields}
        searchPlaceholder="Search by client name..."
        search={search}
        onSearchChange={setSearch}
      />

      {/* Dialogs */}
      <BookingViewDialog open={isViewOpen} setOpen={setIsViewOpen} booking={selectedItem} />
      <BookingFormDialog open={isAddOpen} setOpen={setIsAddOpen} onSubmit={handleAdd} />
      <BookingFormDialog open={isEditOpen} setOpen={setIsEditOpen} initialData={selectedItem!} onSubmit={handleEdit} />
      <BookingDeleteDialog open={isDeleteOpen} setOpen={setIsDeleteOpen} onDelete={handleDelete} />
    </div>
  )
}

export default AdminBookings
