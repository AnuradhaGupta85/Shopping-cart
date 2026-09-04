import React from 'react'
import { getCartTotals, useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

interface OrderSummaryProps {
  compact?: boolean
}

export function OrderSummary({ compact = false }: OrderSummaryProps) {
  const { items, couponCode } = useCart()
  const totals = getCartTotals(items, couponCode)

  return <section className="rounded-card border border-border bg-surface p-5 shadow-card">
    <h2 className="text-lg font-bold">Order summary</h2>
    <div className="mt-5 space-y-3 text-sm">
      <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
      {totals.discount > 0 && <div className="flex justify-between text-success"><span>Discount {couponCode ? `(${couponCode})` : ''}</span><span>-{formatCurrency(totals.discount)}</span></div>}
      <div className="flex justify-between text-muted"><span>Estimated tax</span><span>{formatCurrency(totals.tax)}</span></div>
    </div>
    <div className="mt-5 flex justify-between border-t border-border pt-4 text-lg font-bold"><span>{compact ? 'Total' : 'Order total'}</span><span>{formatCurrency(totals.total)}</span></div>
  </section>
}
