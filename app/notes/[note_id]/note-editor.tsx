'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import dayjs from 'dayjs'
import Image from 'next/image'
import back from "@/app/assets/back.svg"
import Loading from './loading'


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
    const res = await fetch(`/api/notes/${noteId}/title`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
    })
    if (!res.ok) alert('Failed to update title')
  }

  const handleUpdateContent = async (contentId: number, body: string) => {
    const res = await fetch(`/api/content/${contentId}`, {
      method: 'PUT',
      body: JSON.stringify({ body }),
    })
    if (!res.ok) alert('Failed to update content')
  }

  const handleAddContent = async () => {
    if (!newBody.trim()) return

    const res = await fetch(`/api/notes/${noteId}/content`, {
      method: 'POST',
      body: JSON.stringify({ body: newBody }),
    })

    if (res.ok) {
      const newContent: Content = await res.json()

      setContents((prev) => [
        ...prev,
        {
          ...newContent,
          updated_at_fmt: dayjs(newContent.updated_at).format('DD MMM YYYY HH:mm'),
        },
      ])
      setNewBody('')
    } else {
      alert('Failed to add content')
    }
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/notes">
          {/* <Button variant="link"> */}
          <Image src={back} alt="Back to Notes" width={20} height={20} />
          {/* </Button> */}
        </Link>
        <Input
          className="h-12 placeholder:text-xl text-xl font-bold focus:text-xl w-full md:w-1/2 px-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdateTitle}
        />
      </div>

      <div className="">
        {contents.map((c) => (
          <div key={c.id} className="flex items-center flex-col md:flex-row">
            <p className="text-xs font-bold">{c.updated_at_fmt}</p>
            <Input
              type="text"
              className="w-full md:w-[calc(100%-200px)]"
              defaultValue={c.body}
              onBlur={(e) => handleUpdateContent(c.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <Button onClick={handleAddContent}>Add Content</Button>
          <Input
            type="text"
            className="w-full md:w-[calc(100%-200px)]"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Add new content..."
          />
        </div>
      </div>
    </div>
  )
}
