import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";


export default function Loading() {
    return (
        <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-3">
                <ChevronLeft/>
                <div className="h-10 bg-gray-200/20 rounded w-1/2 ml-4"></div>
            </div>
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="h-10 py-3 rounded w-24">
                            <div className="h-full bg-gray-200/20 rounded w-full"></div>
                        </div>
                        <div className="h-10 bg-gray-200/20 rounded w-full"></div>
                    </div>
                ))}
                <div className="flex gap-2 items-center">
                    <Button >Add Content</Button>
                    <Input
                        type="text"
                        className="w-full md:w-[calc(100%-200px)]"
                        placeholder="Add new content..."
                    />
                </div>
            </div>
        </div>
    )
}