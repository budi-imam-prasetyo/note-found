import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  req: NextRequest, 
  { params }: { params: Promise<{ note_id: string }> }
) {
  const supabase = await createClient()
  const { body } = await req.json()
  const { note_id } = await params

  if (!note_id) {
    return new Response('Invalid ID', { status: 400 })
  }

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('content')
    .insert({ note_id: note_id, body, user_id: user?.id })
    .select()
    .single()

  return error
    ? new Response(error.message, { status: 500 })
    : Response.json(data)
}
