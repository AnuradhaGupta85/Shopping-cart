import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { Cart } from './Cart'

test('renders without crashing', () => {
  render(<MemoryRouter><CartProvider><Cart /></CartProvider></MemoryRouter>)
})
