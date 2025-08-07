import { Suspense } from "react"
import { NotesContent } from "./notes-content"
import { NotesLoading } from "./notes-loading"
import BackgroundLogo from "@/app/assets/note-found-background-logo.png"
import Image from "next/image"

export default function Page() {
  return (
    <div className="p-6 relative min-h-screen">
      <Suspense fallback={<NotesLoading />}>
        <Image
          src={BackgroundLogo}
          alt="Notes Background"
          className="absolute left-1/2 top-1/2 w-2/3 md:1/3 lg:w-1/5 object-cover opacity-10 select-none -translate-x-1/2 -translate-y-1/2"
          draggable={false}
        />

        <NotesContent />
      </Suspense>
    </div>
  )
}
