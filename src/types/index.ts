export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  color: string
  inventory: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  couponCode: string | null
}

export interface Order {
  id: string
  customerName: string
  email: string
  address: string
  items: CartItem[]
  couponCode: string | null
  subtotal: number
  discount: number
  tax: number
  total: number
  status: 'Confirmed'
  createdAt: string
}

export interface CheckoutFormValues {
  customerName: string
  email: string
  address: string
  city: string
  postalCode: string
  cardNumber: string
}
