import { Suspense } from "react"
import { NoteEditor } from "./note-editor"
import Loading from "./loading"

interface Params {
  note_id: string
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { note_id } = await params

  return (
    <div className="p-6">
      <Suspense fallback={<Loading />}>
        <NoteEditor noteId={note_id} />
      </Suspense>
    </div>
  )
}
