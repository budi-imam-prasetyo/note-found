import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
// import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const note_id = uuidv4() // bisa juga pakai Supabase `uuid_generate_v4()`, tapi ini dari client
  const { error } = await supabase
    .from('notes')
    .insert({
      note_id,
      user_id: user.id,
      title: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

  if (error) {
    console.error('Insert error:', error)
    return new Response('Failed to create note', { status: 500 })
  }

  // Redirect ke halaman detail catatan
  redirect(`/notes/${note_id}`)
}
