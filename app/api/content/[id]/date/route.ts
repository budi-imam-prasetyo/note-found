import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { created_at } = await request.json()
    const { id: contentId } = await params
    
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('content')
      .update({ created_at })
      .eq('id', contentId)

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { error: 'Failed to update content date' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Content date updated successfully' 
    })
  } catch (error) {
    console.error('Error updating content date:', error)
    return NextResponse.json(
      { error: 'Failed to update content date' },
      { status: 500 }
    )
  }
}
