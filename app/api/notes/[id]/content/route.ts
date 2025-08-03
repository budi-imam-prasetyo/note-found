import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest, { params }: { params: { id: BigInteger } }) {
  const supabase = await createClient()
  const { body } = await req.json()
  const { id } = params

  const { data, error } = await supabase
    .from('content')
    .insert({ note_id: id, body })
    .select()
    .single()

  return error
    ? new Response(error.message, { status: 500 })
    : Response.json(data)
}
