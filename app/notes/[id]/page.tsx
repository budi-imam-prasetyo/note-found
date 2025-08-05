// app/notes/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NoteEditor } from './note-editor'
import dayjs from 'dayjs'

interface Content {
  id: number
  body: string
  updated_at: string
}

interface Note {
  id: string
  title: string
  content: Content[]
}

export const dynamic = 'force-dynamic'

// 1. Accept params as a Promise
export default async function NotePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()

  // 2. Await the params
  const { id } = await params

  const { data: note, error } = await supabase
    .from('notes')
    .select('*, content(*)')
    .eq('id', id)
    .single<Note>()

  if (error || !note) {
    console.error('Failed to fetch note:', error?.message)
    return redirect('/note')
  }

  const formattedContent = (note.content ?? []).map((c: Content) => ({
    ...c,
    updated_at_fmt: dayjs(c.updated_at).format('DD MMM YYYY HH:mm')
  }))

  const formattedNote = {
    ...note,
    content: formattedContent
  }

  return (
    <div className="p-6">
      <NoteEditor note={formattedNote} />
    </div>
  )
}