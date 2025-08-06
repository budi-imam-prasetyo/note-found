import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import dayjs from "dayjs"
import { LogoutButton } from "@/components/logout-button"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import edit from "@/app/assets/edit.svg"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { DeleteNoteButton } from "@/components/delete-note-button"

interface Note {
    note_id: string
    title: string
    created_at: string
    updated_at: string
}

export async function NotesContent() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: note } = await supabase.from("notes").select("*").eq("user_id", user?.id)
    const notes = note as Note[]

    if (!notes || notes.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-2xl font-bold">My Notes</h1>
                    <div className="flex items-center gap-4">
                        Hey, {user?.email}!
                        <LogoutButton />
                    </div>
                </div>
                <div className="text-center mt-10">
                    <p className="text-muted-foreground mb-4">No notes found.</p>
                    <form action="api/notes/create" method="post">
                        <Button type="submit">Tambah Catatan Pertama</Button>
                    </form>
                </div>
            </div>
        )
    }

    const formattedNotes = notes.map((note) => ({
        ...note,
        created_at_fmt: dayjs(note.created_at).format("DD MMM YYYY HH:mm"),
        updated_at_fmt: dayjs(note.updated_at).format("DD MMM YYYY HH:mm"),
    }))

    return (
        <div className="space-y-8 px-4 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">Note Found</h1>
                    <ThemeSwitcher />
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>Hey, <span className="font-medium text-foreground">{user?.email}</span>!</span>
                    <LogoutButton />
                </div>
            </div>

            {/* Action bar */}
            <div className="flex justify-end">
                <form action="api/notes/create" method="post">
                    <Button type="submit" className="shadow">+ Tambah Catatan</Button>
                </form>
            </div>

            {/* Notes grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {formattedNotes.map((note) => (
                    <div key={note.note_id} className="relative border border-border rounded-xl p-4 bg-background shadow-sm hover:shadow-md transition-all duration-200 h-full hover:brightness-[1.05]">

                        {/* Dropdown Tombol Edit */}
                        <div className="absolute top-2 right-2 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="w-8 h-8">
                                        <Image src={edit} alt="Edit" width={16} height={16} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel className="truncate">{note.title}</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DeleteNoteButton noteId={note.note_id} />
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Link ke Detail Note */}
                        <Link href={`/notes/${note.note_id}`} className="block h-full">
                            <div className="flex flex-col justify-between h-full space-y-2">
                                <h2 className="text-lg font-semibold line-clamp-2">{note.title}</h2>
                                <p className="text-xs text-muted-foreground mt-auto">{note.created_at_fmt}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>


        </div>
    )

}
