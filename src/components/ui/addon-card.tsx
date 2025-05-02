"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Plus } from "lucide-react"

interface AddonCardProps {
    title: string
    description: string
    price: number
    image: string
    className?: string
    onAdd?: () => void
}

export function AddonCard({ title, description, price, image, className, onAdd }: AddonCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950",
                className,
            )}
            >
            <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="font-semibold text-primary">Rp{price.toLocaleString()}</span>
                        {onAdd && (
                        <button
                            onClick={onAdd}
                            className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white dark:bg-primary/20"
                        >
                            <Plus className="h-3 w-3" /> Add
                        </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
