import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { Catalog } from './Catalog'

test('renders without crashing', () => {
  render(<MemoryRouter><CartProvider><Catalog /></CartProvider></MemoryRouter>)
})
