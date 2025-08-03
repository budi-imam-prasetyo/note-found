'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NoteEditor({ note }: { note: any }) {
    const [title, setTitle] = useState(note.title)
    const [contents, setContents] = useState(note.content ?? [])
    const [newBody, setNewBody] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdateTitle = async () => {
        setLoading(true)
        const res = await fetch(`/api/notes/${note.id}/title`, {
            method: 'PUT',
            body: JSON.stringify({ title }),
        })
        setLoading(false)
        if (!res.ok) alert('Failed to update title')
    }

    const handleUpdateContent = async (contentId: number, body: string) => {
        const res = await fetch(`/api/content/${contentId}`, {
            method: 'PUT',
            body: JSON.stringify({ body }),
        })
        if (!res.ok) alert('Failed to update content')
    }

    const handleAddContent = async () => {
        if (!newBody.trim()) return;
        const res = await fetch(`/api/notes/${note.id}/content`, {
            method: 'POST',
            body: JSON.stringify({ body: newBody }),
        });

        if (res.ok) {
            const newContent = await res.json();
            // Add formatted date for new content
            setContents((prev: any) => [
                ...prev,
                {
                    ...newContent,
                    updated_at_fmt: new Date().toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            ]);
            setNewBody('');
        } else {
            alert('Failed to add content');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <Input className='h-12 placeholder:text-xl text-xl focus:text-xl w-full md:w-1/2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleUpdateTitle}
                />

            </div>

            <div>
                <div className="">
                    {contents.map((c: any) => (
                        <div key={c.id} className="flex gap-1 items-center flex-col md:flex-row">
                            <p className="text-xs font-bold">
                                {c.updated_at_fmt}
                            </p>
                            <Input type='text' className='w-full md:w-[calc(100%-200px)]'
                                defaultValue={c.body}
                                onBlur={(e) => handleUpdateContent(c.id, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <div className='flex gap-2 items-center'>
                        <Button onClick={handleAddContent}>
                            Add Content
                        </Button>
                        <Input type='text' className='w-full md:w-[calc(100%-200px)]'
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            placeholder="Add new content..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
