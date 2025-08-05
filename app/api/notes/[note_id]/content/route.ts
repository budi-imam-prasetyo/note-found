import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { body } = await req.json()

  // Ambil id dari URL
  const url = new URL(req.url)
  const id = url.pathname.split('/').slice(-2, -1)[0] // ambil [id] dari "/notes/[id]/content"

  if (!id) {
    return new Response('Invalid ID', { status: 400 })
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('content')
    .insert({ note_id: id, body, user_id: user?.id }) // tambahkan user_id
    .select()
    .single()


  return error
    ? new Response(error.message, { status: 500 })
    : Response.json(data)
}
