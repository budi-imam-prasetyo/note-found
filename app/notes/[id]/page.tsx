import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NoteEditor } from './note-editor'
import dayjs from 'dayjs'

interface NotePageProps {
  params: { id: string }
}

// Optional: avoid caching for per-user dynamic content
export const dynamic = 'force-dynamic'

export default async function NotePage({ params }: NotePageProps) {
  const supabase = await createClient()
  const { id } = params

  const { data: note, error } = await supabase
    .from('notes')
    .select('*, content(*)')
    .eq('id', id)
    .single()

  if (error || !note) {
    console.error('Failed to fetch note:', error?.message)
    return redirect('/note')
  }

  const formattedContent = (note.content ?? []).map((c: any) => ({
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
