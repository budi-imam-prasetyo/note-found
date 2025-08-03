import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(req: NextRequest, { params }: { params: { id: BigInteger } }) {
  const supabase = await createClient()
  const { title } = await req.json()
  const { id } = params

  const { error } = await supabase
    .from('notes')
    .update({ title })
    .eq('id', id)

  return error ? new Response(error.message, { status: 500 }) : new Response('OK')
}
