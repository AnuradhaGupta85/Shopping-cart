import React from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { Product } from '../types'
import { formatCurrency } from '../utils/format'
import { QuantityControl } from './QuantityControl'

interface ProductCardProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAdd: () => void
  added?: boolean
}

export function ProductCard({ product, quantity, onQuantityChange, onAdd, added = false }: ProductCardProps) {
  return <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
    <div className={`relative flex h-44 items-center justify-center ${product.color}`}>
      <ShoppingBag size={46} strokeWidth={1.5} className="text-text/60 transition-transform duration-200 group-hover:scale-110" />
      <span className="absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold text-text shadow-sm">{product.inventory} left</span>
    </div>
    <div className="flex flex-1 flex-col p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">{product.category}</p>
      <h2 className="mt-2 text-base font-bold text-text">{product.name}</h2>
      <p className="mt-2 min-h-10 text-sm leading-5 text-muted">{product.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-lg font-bold text-text">{formatCurrency(product.price)}</p>
        <QuantityControl quantity={quantity} max={product.inventory} onChange={onQuantityChange} />
      </div>
      <button onClick={onAdd} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-card bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover">
        {added ? <><Check size={17} />Added to cart</> : <><ShoppingBag size={17} />Add to cart</>}
      </button>
    </div>
  </article>
}
