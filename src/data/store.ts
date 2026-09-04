import apiClient from '../api/client'
import { Order } from '../types'

const ORDER_KEY = 'shopping_cart_orders'
export const USE_MOCK_ORDERS = true

function loadOrders(): Order[] {
  const rawOrders = localStorage.getItem(ORDER_KEY)
  return rawOrders ? JSON.parse(rawOrders) : []
}

function localGetOrders(): Order[] {
  return loadOrders()
}

function localGetOrder(id: string): Order | undefined {
  return loadOrders().find((order) => order.id === id)
}

function localCreateOrder(input: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const order: Order = {
    ...input,
    id: `ORD-${Date.now().toString().slice(-6)}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  }
  const orders = [order, ...loadOrders()]
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders))
  return order
}

// TODO(USE_MOCK): Verify API paths and response shapes before enabling live order calls.
export async function getOrders(): Promise<Order[]> {
  if (USE_MOCK_ORDERS) return localGetOrders()
  const response = await apiClient.get('/api/v1/orders')
  return response.data
}

export async function getOrder(id: string): Promise<Order | undefined> {
  if (USE_MOCK_ORDERS) return localGetOrder(id)
  const response = await apiClient.get(`/api/v1/orders/${id}`)
  return response.data
}

export async function createOrder(input: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  if (USE_MOCK_ORDERS) return localCreateOrder(input)
  const response = await apiClient.post('/api/v1/orders', input)
  return response.data
}
