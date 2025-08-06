'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import dayjs from 'dayjs'
import Image from 'next/image'
import back from "@/app/assets/back.svg"
import Loading from './loading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'


interface Content {
  id: number
  body: string
  updated_at: string
  updated_at_fmt?: string
}

// interface Note {
//   note_id: string
//   title: string
//   content: Content[]
// }

export function NoteEditor({ noteId }: { noteId: string }) {
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState<Content[]>([])
  const [newBody, setNewBody] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data setelah komponen dimount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/notes/${noteId}`)
        const data = await res.json()

        if (!res.ok || !data || !data.content) {
          setTitle('[Note not found]')
          setContents([])
          return
        }
        console.log('Fetching note with id:', data.note_id)


        setTitle(data.title)
        setContents(data.content.map((c: Content) => ({
          ...c,
          updated_at_fmt: dayjs(c.updated_at).format('DD MMM YYYY HH:mm')
        })))
      } catch (error) {
        console.error('Failed to fetch note:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [noteId])

  const handleUpdateTitle = async () => {
    try {
      await fetch(`/api/notes/${noteId}/title`, {
        method: 'PUT',
        body: JSON.stringify({ title }),
      })
      // if (!res.ok) alert('Failed to update title')
    } catch {
      setAlert({ type: "error", message: "Failed to update title" })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  const handleUpdateContent = async (contentId: number, body: string) => {
    try {
      await fetch(`/api/content/${contentId}`, {
        method: 'PUT',
        body: JSON.stringify({ body }),
      })
      // if (!res.ok) alert('Failed to update content')
    } catch {
      setAlert({ type: "error", message: "Failed to update content" })
      setTimeout(() => setAlert(null), 3000)
    }
  }


  const handleAddContent = async () => {
    try {
      // if (!newBody.trim()) return

      const res = await fetch(`/api/notes/${noteId}/content`, {
        method: 'POST',
        body: JSON.stringify({ body: newBody }),
      })

      // if (res.ok) {
      const newContent: Content = await res.json()

      setContents((prev) => [
        ...prev,
        {
          ...newContent,
          updated_at_fmt: dayjs(newContent.updated_at).format('DD MMM YYYY HH:mm'),
        },
      ])
      setNewBody('')
      // } else {
      //   alert('Failed to add content')
      // }
    } catch {
      setAlert({ type: "error", message: "Failed to add content" })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  // const router = useRouter()

// useEffect(() => {
//   return () => {
//     // Jangan hapus kalau masih loading (belum selesai ambil data)
//     if (isLoading) return

//     const isEmptyTitle = title.trim() === ''
//     const isEmptyContent = contents.length === 0

//     if (isEmptyTitle && isEmptyContent) {
//       fetch(`/api/notes/${noteId}`, {
//         method: 'DELETE',
//       }).catch((err) => console.error('Failed to auto-delete note:', err))
//     }
//   }
// }, [title, contents, isLoading, noteId])


  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
  <div className="space-y-6 px-4 py-6">
    {/* Header dengan tombol kembali dan judul */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
      <Link href="/notes" className="shrink-0">
        <Image src={back} alt="Back to Notes" width={24} height={24} className="hover:opacity-70 transition" />
      </Link>
      <Input
        className="h-12 placeholder:text-2xl text-2xl font-bold focus:text-2xl px-2 w-full"
        value={title}
        placeholder="Judul Catatan"
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleUpdateTitle}
      />
    </div>

    {/* Alert */}
    {alert && (
      <Alert variant={alert.type === "error" ? "destructive" : "default"}>
        {alert.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
        <AlertDescription>{alert.message}</AlertDescription>
      </Alert>
    )}

    {/* Konten yang sudah ada */}
    <div>
      {contents.map((c) => (
        <div key={c.id} className="flex flex-col md:flex-row md:items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground md:w-40">{c.updated_at_fmt}</p>
          <Input
            type="text"
            className="w-full"
            defaultValue={c.body}
            onBlur={(e) => handleUpdateContent(c.id, e.target.value)}
          />
        </div>
      ))}
    </div>

    {/* Tambah konten baru */}
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
      <Button onClick={handleAddContent} className="shrink-0">
        Tambah Konten
      </Button>
      <Input
        type="text"
        className="w-full"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        placeholder="Tambahkan konten baru..."
      />
    </div>
  </div>
)

}
