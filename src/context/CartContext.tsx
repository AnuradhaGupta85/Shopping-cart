import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { CartItem, CartState, Product } from '../types'

interface CartContextValue extends CartState {
  addItem: (product: Product, quantity: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  applyCoupon: (couponCode: string | null) => void
  clearCart: () => void
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity: number }
  | { type: 'UPDATE'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'COUPON'; couponCode: string | null }
  | { type: 'CLEAR' }

const initialState: CartState = { items: [], couponCode: null }
const CartContext = createContext<CartContextValue | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === 'ADD') {
    const existing = state.items.find((item) => item.product.id === action.product.id)
    const items = existing
      ? state.items.map((item) => item.product.id === action.product.id
        ? { ...item, quantity: Math.min(item.quantity + action.quantity, item.product.inventory) }
        : item)
      : [...state.items, { product: action.product, quantity: action.quantity }]
    return { ...state, items }
  }
  if (action.type === 'UPDATE') {
    return { ...state, items: action.quantity < 1 ? state.items.filter((item) => item.product.id !== action.productId) : state.items.map((item) => item.product.id === action.productId ? { ...item, quantity: Math.min(action.quantity, item.product.inventory) } : item) }
  }
  if (action.type === 'REMOVE') return { ...state, items: state.items.filter((item) => item.product.id !== action.productId) }
  if (action.type === 'COUPON') return { ...state, couponCode: action.couponCode }
  return initialState
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (defaultState) => {
    const saved = localStorage.getItem('shopping_cart')
    return saved ? JSON.parse(saved) : defaultState
  })

  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(state))
  }, [state])

  const value: CartContextValue = {
    ...state,
    addItem: (product, quantity) => dispatch({ type: 'ADD', product, quantity }),
    updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE', productId, quantity }),
    removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
    applyCoupon: (couponCode) => dispatch({ type: 'COUPON', couponCode }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

export function getCartTotals(items: CartItem[], couponCode: string | null) {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const discountRate = couponCode === 'SAVE20' ? 0.2 : couponCode === 'WELCOME10' ? 0.1 : 0
  const discount = subtotal * discountRate
  const tax = (subtotal - discount) * 0.08
  return { subtotal, discount, tax, total: subtotal - discount + tax }
}
