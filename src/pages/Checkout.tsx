import React, { FormEvent, useState } from 'react'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { OrderSummary } from '../components/OrderSummary'
import { getCartTotals, useCart } from '../context/CartContext'
import { createOrder } from '../data/store'
import { CheckoutFormValues } from '../types'
import { validateCardNumber, validateEmail, validateRequired } from '../validation/forms'

const initialValues: CheckoutFormValues = { customerName: '', email: '', address: '', city: '', postalCode: '', cardNumber: '' }

export function Checkout() {
  const navigate = useNavigate()
  const { items, couponCode, clearCart } = useCart()
  const [values, setValues] = useState(initialValues)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const errors = { customerName: validateRequired(values.customerName, 'Full name'), email: validateEmail(values.email), address: validateRequired(values.address, 'Address'), city: validateRequired(values.city, 'City'), postalCode: validateRequired(values.postalCode, 'Postal code'), cardNumber: validateCardNumber(values.cardNumber) }
  const isValid = items.length > 0 && !Object.values(errors).some(Boolean)

  if (!items.length) return <div className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="text-2xl font-bold">Your cart is empty</h1><button onClick={() => navigate('/catalog')} className="mt-5 rounded-card bg-primary px-5 py-3 text-sm font-semibold text-white">Return to shop</button></div>

  function update(field: keyof CheckoutFormValues, value: string) { setValues({ ...values, [field]: value }) }
  async function submit(event: FormEvent) { event.preventDefault(); setSubmitted(true); if (!isValid) return; try { const totals = getCartTotals(items, couponCode); const order = await createOrder({ customerName: values.customerName, email: values.email, address: `${values.address}, ${values.city} ${values.postalCode}`, items, couponCode, ...totals }); clearCart(); navigate(`/confirmation/${order.id}`) } catch { setError('We could not submit your order. Please try again.') } }
  function field(name: keyof CheckoutFormValues, label: string, type = 'text') { const message = errors[name]; return <label className="block text-sm font-semibold">{label}<input type={type} value={values[name]} onChange={(event) => update(name, event.target.value)} className="mt-2 h-11 w-full rounded-card border border-border px-3 text-sm font-normal" />{submitted && message && <span className="mt-1 block text-xs font-normal text-danger">{message}</span>}{name === 'cardNumber' && !(submitted && message) && <span className="mt-1 block text-xs font-normal text-muted">Enter a valid 16-digit card number.</span>}</label> }
  return <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10"><button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-sm font-semibold text-muted"><ArrowLeft size={17} />Back to cart</button><h1 className="mt-5 text-3xl font-bold">Checkout</h1><div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]"><form onSubmit={submit} className="space-y-6"><section className="rounded-card border border-border bg-surface p-5 shadow-card"><h2 className="text-lg font-bold">Contact information</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{field('customerName', 'Full name')}{field('email', 'Email address', 'email')}</div></section><section className="rounded-card border border-border bg-surface p-5 shadow-card"><h2 className="text-lg font-bold">Delivery details</h2><div className="mt-5 grid gap-4">{field('address', 'Street address')}<div className="grid gap-4 sm:grid-cols-2">{field('city', 'City')}{field('postalCode', 'Postal code')}</div></div></section><section className="rounded-card border border-border bg-surface p-5 shadow-card"><h2 className="flex items-center gap-2 text-lg font-bold"><LockKeyhole size={18} />Payment</h2><div className="mt-5">{field('cardNumber', 'Card number', 'text')}</div></section>{error && <p className="rounded-card bg-red-50 p-3 text-sm text-danger">{error}</p>}<button disabled={!isValid} className="w-full rounded-card bg-primary px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Place order</button></form><aside><OrderSummary /></aside></div></div>
}
