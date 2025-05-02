"use client"

import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import type { ReactNode } from "react"

interface GradientCardProps {
  title: string
  description?: string
  price: number
  features: { name: string; included: boolean }[]
  popular?: boolean
  className?: string
  gradientClass?: string
  children?: ReactNode
  onAction?: () => void
  actionText?: string
}

export function GradientCard({
  title,
  description,
  price,
  features,
  popular = false,
  className,
  gradientClass = "from-blue-600 to-violet-600",
  children,
  onAction,
  actionText = "Add to Cart",
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800",
        popular ? "ring-2 ring-primary" : "",
        className,
      )}
    >
      {popular && (
        <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-primary px-3 py-1 text-xs font-bold text-white">
          Popular
        </div>
      )}

      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10`}></div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {description && <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>}
        </div>

        <div className="mb-6">
          <div className="text-3xl font-bold mb-1">Rp{price.toLocaleString()}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">One-time payment</div>
        </div>

        <div className="mb-6 flex-grow">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Features</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mr-2 shrink-0" />
                )}
                <span className={feature.included ? "" : "text-gray-400 dark:text-gray-500"}>{feature.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {children}

        {onAction && (
          <button
            onClick={onAction}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors font-medium"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
}
