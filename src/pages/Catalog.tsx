import React, { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { products } from '../data/mockData'
import { Product } from '../types'

const PRODUCTS_PER_PAGE = 4

export function Catalog() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [addedId, setAddedId] = useState('')
  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))]
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const searchText = `${product.name} ${product.description}`.toLowerCase()
    return matchesCategory && searchText.includes(query.trim().toLowerCase())
  }), [category, query])
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const visibleProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => { setPage(1) }, [query, category])

  function addProduct(product: Product) {
    addItem(product, quantities[product.id] || 1)
    setAddedId(product.id)
    window.setTimeout(() => setAddedId((current) => current === product.id ? '' : current), 1300)
  }

  return <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="text-sm font-bold tracking-wide text-primary">THE DAILY EDIT</p><h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Find your next favorite.</h1><p className="mt-3 max-w-xl text-muted">Useful objects, considered materials, and a little joy for everyday living.</p></div>
      <button onClick={() => navigate('/cart')} className="h-11 rounded-card border border-border bg-surface px-5 text-sm font-semibold transition hover:border-primary hover:text-primary">View cart</button>
    </div>
    <section className="mt-8 rounded-xl border border-border bg-surface p-4 shadow-card md:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block max-w-md flex-1"><span className="sr-only">Search products</span><Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="h-11 w-full rounded-card border border-border bg-background pl-10 pr-3 text-sm" /></label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1"><SlidersHorizontal size={17} className="shrink-0 text-muted" /><span className="shrink-0 text-sm font-semibold text-muted">Filter:</span>{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition ${category === item ? 'bg-primary text-white' : 'bg-background text-muted hover:bg-blue-50 hover:text-primary'}`}>{item}</button>)}</div>
      </div>
    </section>
    <div className="mt-6 flex items-center justify-between"><p className="text-sm text-muted"><span className="font-semibold text-text">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found</p>{pageCount > 1 && <p className="hidden text-sm text-muted sm:block">Page {page} of {pageCount}</p>}</div>
    {loading ? <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((number) => <div key={number} className="animate-pulse rounded-xl border border-border bg-surface p-4"><div className="h-44 rounded-card bg-slate-100" /><div className="mt-4 h-4 w-2/3 rounded bg-slate-100" /><div className="mt-3 h-10 rounded bg-slate-100" /></div>)}</div> : visibleProducts.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} quantity={quantities[product.id] || 1} onQuantityChange={(quantity) => setQuantities({ ...quantities, [product.id]: quantity })} onAdd={() => addProduct(product)} added={addedId === product.id} />)}</div> : <div className="mt-5 rounded-xl border border-dashed border-border bg-surface px-5 py-14 text-center"><h2 className="text-lg font-bold">No products found</h2><p className="mt-2 text-sm text-muted">Try a different search or clear your filters.</p><button onClick={() => { setQuery(''); setCategory('All') }} className="mt-5 text-sm font-semibold text-primary hover:underline">Clear filters</button></div>}
    {pageCount > 1 && <nav aria-label="Product pagination" className="mt-8 flex items-center justify-center gap-2"><button aria-label="Previous page" disabled={page === 1} onClick={() => setPage(page - 1)} className="flex h-10 w-10 items-center justify-center rounded-card border border-border bg-surface text-muted disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={18} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} aria-current={page === number ? 'page' : undefined} onClick={() => setPage(number)} className={`h-10 min-w-10 rounded-card px-3 text-sm font-semibold ${page === number ? 'bg-primary text-white' : 'border border-border bg-surface text-muted hover:text-primary'}`}>{number}</button>)}<button aria-label="Next page" disabled={page === pageCount} onClick={() => setPage(page + 1)} className="flex h-10 w-10 items-center justify-center rounded-card border border-border bg-surface text-muted disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={18} /></button></nav>}
  </div>
}
