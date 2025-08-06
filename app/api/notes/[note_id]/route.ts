import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ note_id: string }> }) {
  const supabase = await createClient()
  const { note_id } = await params

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("*, content(*)")
      .eq("note_id", note_id)
      .eq("user_id", user.id) // hanya ambil milik sendiri
      .maybeSingle()

    if (noteError || !note) {
      return NextResponse.json({ error: "Notes not found" }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ note_id: string }> }) {
  const supabase = await createClient()
  const { note_id } = await params

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('note_id', note_id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
