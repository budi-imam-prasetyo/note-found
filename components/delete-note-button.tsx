'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import { Delete } from "lucide-react"

interface DeleteNoteButtonProps {
  noteId: string
}

export function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast.success("Catatan berhasil dihapus.")
      router.refresh()
    } else {
      const error = await res.json()
      toast.error("Gagal menghapus catatan", {
        description: error.error || "Terjadi kesalahan pada server.",
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Hapus
          <DropdownMenuShortcut>
            <Delete />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Catatan?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Catatan ini akan dihapus secara permanen.
        </p>
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button variant="default" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
