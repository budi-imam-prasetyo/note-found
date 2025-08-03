import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import dayjs from 'dayjs'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  if (!notes || notes.length === 0) {
    return <div className="text-center mt-10">No notes found.</div>
  }

  const formattedNotes = notes.map((note: any) => ({
    ...note,
    created_at_fmt: dayjs(note.created_at).format('DD MMM YYYY HH:mm'),
    updated_at_fmt: dayjs(note.updated_at).format('DD MMM YYYY HH:mm'),
  }))

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      {formattedNotes.map((note) => (
        <Link key={note.id} href={`/notes/${note.id}`}>
          <div className="border rounded p-4 mb-4 transition cursor-pointer hover:bg-muted">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-sm text-gray-500">Created: {note.created_at_fmt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
