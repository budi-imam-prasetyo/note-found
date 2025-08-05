import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  const { body } = await req.json()

  const url = new URL(req.url)
  const id = url.pathname.split('/').pop() // ambil [id] dari URL

  if (!id) {
    return new Response('Invalid ID', { status: 400 })
  }

  const { error } = await supabase
    .from('content')
    .update({
      body,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  return error
    ? new Response(error.message, { status: 500 })
    : new Response('OK', { status: 200 })
}
