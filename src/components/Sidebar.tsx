import React from 'react'
import { Package, ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Shop', to: '/catalog', icon: Package },
  { label: 'Cart', to: '/cart', icon: ShoppingBag },
]

export function Sidebar() {
  return <nav className="hidden w-52 flex-col border-r border-border bg-surface px-4 py-6 md:flex">
    <NavLink to="/catalog" className="mb-8 flex items-center gap-2 px-2 text-base font-bold text-text"><span className="flex h-8 w-8 items-center justify-center rounded-card bg-primary text-white">S</span>Simple Store</NavLink>
    <div className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon
        return <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'flex items-center gap-3 rounded-card bg-blue-50 px-3 py-2.5 text-sm font-semibold text-primary' : 'flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium text-muted hover:bg-background'}><Icon size={18} />{item.label}</NavLink>
      })}
    </div>
  </nav>
}
