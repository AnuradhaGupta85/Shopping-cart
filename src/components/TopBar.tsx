import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function TopBar() {
  const { items } = useCart()
  const quantity = items.reduce((total, item) => total + item.quantity, 0)

  return <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-5 md:px-8">
    <NavLink to="/catalog" className="flex items-center gap-2 font-bold md:hidden"><span className="flex h-8 w-8 items-center justify-center rounded-card bg-primary text-white">S</span>Simple Store</NavLink>
    <p className="hidden text-sm text-muted md:block">Thoughtfully chosen essentials</p>
    <div className="flex items-center gap-2"><NavLink to="/login" className="hidden h-10 items-center rounded-card px-3 text-sm font-semibold text-muted transition hover:bg-background hover:text-primary sm:flex">Sign in</NavLink><NavLink to="/cart" className="relative flex h-10 items-center gap-2 rounded-card border border-border px-3 text-sm font-semibold transition hover:border-primary hover:bg-background"><ShoppingBag size={18} />Cart{quantity > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-white">{quantity}</span>}</NavLink></div>
  </header>
}
