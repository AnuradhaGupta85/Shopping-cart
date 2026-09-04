import React from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center"><p className="text-sm font-semibold text-primary">404</p><h1 className="mt-2 text-3xl font-bold">Page not found</h1><p className="mt-3 text-muted">The page you requested does not exist.</p><Link to="/" className="mt-6 rounded-card bg-primary px-5 py-3 text-sm font-semibold text-white">Go home</Link></main>
}
