import React, { FormEvent, useState } from 'react'
import { CheckCircle2, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { couponCodes } from '../data/mockData'

export function CouponForm() {
  const { couponCode, applyCoupon } = useCart()
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const normalizedCode = code.trim().toUpperCase()
    if (!normalizedCode) return
    if (couponCodes[normalizedCode]) {
      applyCoupon(normalizedCode)
      setMessage(`${normalizedCode} applied — discount added.`)
    } else {
      setMessage('That coupon code is not valid.')
    }
  }

  return <section className="rounded-card border border-border bg-surface p-5 shadow-card">
    <h2 className="flex items-center gap-2 text-lg font-bold"><Tag size={18} className="text-primary" />Have a coupon?</h2>
    <form onSubmit={submit} className="mt-4 flex gap-2">
      <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter code" className="h-10 min-w-0 flex-1 rounded-card border border-border px-3 text-sm" />
      <button disabled={!code.trim()} className="rounded-card bg-primary px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Apply</button>
    </form>
    {couponCode && <button onClick={() => { applyCoupon(null); setMessage('Coupon removed.') }} className="mt-3 text-sm font-medium text-primary">Remove {couponCode}</button>}
    {message && <p className={`mt-3 flex items-center gap-1 text-sm ${message.includes('not valid') ? 'text-danger' : 'text-success'}`}><CheckCircle2 size={15} />{message}</p>}
    <p className="mt-3 text-xs text-muted">Try WELCOME10 or SAVE20</p>
  </section>
}
