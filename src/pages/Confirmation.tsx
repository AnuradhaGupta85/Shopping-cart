import React, { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrder } from '../data/store'
import { Order } from '../types'
import { formatCurrency, formatOrderDate } from '../utils/format'

export function Confirmation() {
  const navigate = useNavigate()
  const { orderId } = useParams<{ orderId: string }>()
  const [order, setOrder] = useState<Order | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => { getOrder(orderId || '').then((result) => { setOrder(result); setLoading(false) }) }, [orderId])
  if (loading) return <div className="mx-auto max-w-2xl animate-pulse px-5 py-16"><div className="h-56 rounded-card bg-slate-100" /></div>
  if (!order) return <div className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="text-2xl font-bold">Order not found</h1><button onClick={() => navigate('/catalog')} className="mt-5 rounded-card bg-primary px-5 py-3 text-sm font-semibold text-white">Return to shop</button></div>
  return <div className="mx-auto max-w-2xl px-5 py-14 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-success"><CheckCircle2 size={36} /></div><p className="mt-6 text-sm font-semibold text-primary">ORDER CONFIRMED</p><h1 className="mt-2 text-3xl font-bold">Thank you, {order.customerName.split(' ')[0]}.</h1><p className="mt-3 text-muted">We’ve received your order and will send confirmation details to {order.email}.</p><section className="mt-8 rounded-card border border-border bg-surface p-6 text-left shadow-card"><div className="flex justify-between border-b border-border pb-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-muted">Order number</p><p className="mt-1 font-bold">{order.id}</p></div><p className="text-sm text-muted">{formatOrderDate(order.createdAt)}</p></div><div className="mt-4 space-y-3">{order.items.map((item) => <div key={item.product.id} className="flex justify-between text-sm"><span>{item.quantity} × {item.product.name}</span><span className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</span></div>)}</div><div className="mt-5 flex justify-between border-t border-border pt-4 text-lg font-bold"><span>Total paid</span><span>{formatCurrency(order.total)}</span></div></section><button onClick={() => navigate('/catalog')} className="mt-7 rounded-card bg-primary px-5 py-3 text-sm font-semibold text-white">Continue shopping</button></div>
}
