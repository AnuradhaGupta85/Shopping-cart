import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Confirmation } from './Confirmation'

test('renders without crashing', () => {
  render(<MemoryRouter><Confirmation /></MemoryRouter>)
})
