import { Product } from '../types'

export const products: Product[] = [
  { id: 'p1', name: 'Wireless Headphones', description: 'Immersive sound with all-day comfort.', price: 79.99, category: 'Audio', color: 'bg-violet-100', inventory: 12 },
  { id: 'p2', name: 'Minimal Desk Lamp', description: 'Warm adjustable light for focused work.', price: 42.5, category: 'Home', color: 'bg-amber-100', inventory: 9 },
  { id: 'p3', name: 'Everyday Backpack', description: 'A durable companion for any commute.', price: 64, category: 'Travel', color: 'bg-sky-100', inventory: 15 },
  { id: 'p4', name: 'Ceramic Coffee Set', description: 'Four hand-finished cups for slow mornings.', price: 36, category: 'Home', color: 'bg-rose-100', inventory: 8 },
  { id: 'p5', name: 'Mechanical Keyboard', description: 'Tactile keys and a compact layout.', price: 109, category: 'Office', color: 'bg-emerald-100', inventory: 6 },
  { id: 'p6', name: 'Classic Water Bottle', description: 'Insulated steel in a timeless silhouette.', price: 24.99, category: 'Outdoor', color: 'bg-blue-100', inventory: 22 },
  { id: 'p7', name: 'Linen Throw', description: 'A lightweight layer for quiet evenings.', price: 48, category: 'Home', color: 'bg-orange-100', inventory: 11 },
  { id: 'p8', name: 'Analog Watch', description: 'A refined everyday piece with leather strap.', price: 135, category: 'Accessories', color: 'bg-stone-200', inventory: 5 },
]

export const couponCodes: Record<string, number> = {
  WELCOME10: 0.1,
  SAVE20: 0.2,
}
