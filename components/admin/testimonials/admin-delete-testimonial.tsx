import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Testimonial } from "@/lib/types/types"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  testimonial: Testimonial
  onSuccess: () => void
}

export function TestimonialDeleteDialog({
  open,
  setOpen,
  testimonial,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    await fetch(`/api/testimonials/${testimonial.id}`, {
      method: "DELETE",
    })

    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md text-black">
        <DialogHeader>
          <DialogTitle>Delete Testimonial</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this testimonial?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
