import React from 'react'
import { Minus, Plus } from 'lucide-react'

interface QuantityControlProps {
  quantity: number
  onChange: (quantity: number) => void
  max: number
}

export function QuantityControl({ quantity, onChange, max }: QuantityControlProps) {
  return <div className="inline-flex h-10 items-center rounded-card border border-border bg-surface">
    <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => onChange(quantity - 1)} className="px-3 text-muted disabled:cursor-not-allowed disabled:opacity-40"><Minus size={16} /></button>
    <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
    <button aria-label="Increase quantity" disabled={quantity >= max} onClick={() => onChange(quantity + 1)} className="px-3 text-muted disabled:cursor-not-allowed disabled:opacity-40"><Plus size={16} /></button>
  </div>
}
