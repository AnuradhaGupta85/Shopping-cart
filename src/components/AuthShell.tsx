import React, { ReactNode } from 'react'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AuthShellProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return <main className="min-h-screen bg-background px-5 py-10 sm:flex sm:items-center sm:justify-center">
    <section className="mx-auto w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-bold text-text"><span className="flex h-9 w-9 items-center justify-center rounded-card bg-primary text-white"><ShoppingBag size={18} /></span>Simple Store</Link>
      <h1 className="mt-8 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
      {children}
    </section>
  </main>
}
