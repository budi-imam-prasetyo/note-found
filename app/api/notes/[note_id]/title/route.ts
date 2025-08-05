import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ note_id: string }> }) {
  const supabase = await createClient()
  const { title } = await req.json()
  const { note_id } = await params

  if (!note_id) {
    return new Response("Invalid ID", { status: 400 })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { error } = await supabase.from("notes").update({ title }).eq("note_id", note_id).eq("user_id", user.id)

  return error ? new Response(error.message, { status: 500 }) : new Response("OK")
}
