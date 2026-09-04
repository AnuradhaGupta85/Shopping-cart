import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { Checkout } from './Checkout'

test('renders without crashing', () => {
  render(<MemoryRouter><CartProvider><Checkout /></CartProvider></MemoryRouter>)
})
