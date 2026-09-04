import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import { Cart } from '../pages/Cart'
import { Catalog } from '../pages/Catalog'
import { Checkout } from '../pages/Checkout'
import { Confirmation } from '../pages/Confirmation'
import { NotFound } from '../pages/NotFound'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/catalog" replace /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'confirmation/:orderId', element: <Confirmation /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },
])
