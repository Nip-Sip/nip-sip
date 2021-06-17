/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Test from './Test'
import '@testing-library/jest-dom'

describe('Test', () => {
  test('renders Home component', () => {
    render(<Test />)

    screen.getByText('Hello Nip Sip')
    expect(screen.queryByText('Not in Text')).toBeNull()
  })
})
