import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CartProvider } from './context/CartContext'
import { router } from './routes'
import './index.css'

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root'),
)
