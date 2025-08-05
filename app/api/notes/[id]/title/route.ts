import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  const { title } = await req.json()

  // Ambil ID dari URL
  const url = new URL(req.url)
  const id = url.pathname.split('/')[4] // "/api/notes/[id]/title" → index ke-4

  if (!id) {
    return new Response('Invalid ID', { status: 400 })
  }

  const { error } = await supabase
    .from('notes')
    .update({ title })
    .eq('id', id)

  return error
    ? new Response(error.message, { status: 500 })
    : new Response('OK')
}
