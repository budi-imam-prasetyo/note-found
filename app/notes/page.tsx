import { Suspense } from "react"
import { NotesContent } from "./notes-content"
import { NotesLoading } from "./notes-loading"

export default function Page() {
  return (
    <div className="p-6">
      <Suspense fallback={<NotesLoading />}>
        <NotesContent />
      </Suspense>
    </div>
  )
}
