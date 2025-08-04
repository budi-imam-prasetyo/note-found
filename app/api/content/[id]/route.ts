import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { body } = await req.json()

  const { id } = params

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
