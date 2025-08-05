import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import dayjs from 'dayjs'
import { LogoutButton } from '@/components/logout-button'

interface Note {
  note_id: string
  title: string
  created_at: string
  updated_at: string
}

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  // const users = user?.claims;

  const { data: note } = await supabase.from('notes').select('*').eq('user_id', user?.id);
  const notes = note as Note[]

  if (!notes || notes.length === 0) {
    return <div className="text-center mt-10">No notes found.</div>
  }

  const formattedNotes = notes.map((note) => ({
    ...note,
    created_at_fmt: dayjs(note.created_at).format('DD MMM YYYY HH:mm'),
    updated_at_fmt: dayjs(note.updated_at).format('DD MMM YYYY HH:mm'),
  }))

  return (
    <div className="p-6">
      <div className='flex justify-between items-center border-b pb-4 mb-6'>
        <h1 className="text-2xl font-bold mb-4">My Notes</h1>
        <div className="flex items-center gap-4">
          Hey, {user?.email}!
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {formattedNotes.map((note) => (
          <Link key={note.note_id} href={`/notes/${note.note_id}`}>
            <div className="border rounded p-4 transition cursor-pointer hover:bg-muted h-full flex flex-col justify-between">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-500">{note.created_at_fmt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
