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
  created_at: string
  created_at_fmt?: string
}

export function NoteEditor({ noteId }: { noteId: string }) {
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState<Content[]>([])
  const [newBody, setNewBody] = useState('')
  const [isLoading, setIsLoading] = useState(true)
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
        setTitle(data.title)
        setContents(data.content.map((c: Content) => ({
          ...c,
          created_at_fmt: dayjs(c.created_at).format('DD MMM YYYY HH:mm')
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
    } catch {
      setAlert({ type: "error", message: "Failed to update content" })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  const handleAddContent = async () => {
    try {
      const res = await fetch(`/api/notes/${noteId}/content`, {
        method: 'POST',
        body: JSON.stringify({ body: newBody }),
      })
      const newContent: Content = await res.json()

      setContents((prev) => [
        ...prev,
        {
          ...newContent,
        },
      ])
      setNewBody('')

    } catch {
      setAlert({ type: "error", message: "Failed to add content" })
      setTimeout(() => setAlert(null), 3000)
    }
  }

const groupedByDate = [...contents]
  .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) // sort ascending
  .reduce((acc, item) => {
    const dateKey = dayjs(item.created_at).format('DD-MM-YYYY')
    const time = dayjs(item.created_at).format('HH.mm')

    if (!acc[dateKey]) acc[dateKey] = []

    acc[dateKey].push({
      ...item,
      time,
    })

    return acc
  }, {} as Record<string, (Content & { time: string })[]>)


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
      {/* Konten dikelompokkan berdasarkan tanggal */}
      <div className="space-y-4">
        {Object.entries(groupedByDate).map(([date, items]) => (
          <div key={date}>
            <p className="text-sm font-semibold text-muted-foreground">{date}</p>
            <div className="space-y-2 pl-7 mt-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="w-[60px] text-xs text-muted-foreground text-end">{item.time}</span>
                  <Input
                    type="text"
                    defaultValue={item.body}
                    onBlur={(e) => handleUpdateContent(item.id, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
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
