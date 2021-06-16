/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Test from './Test'
import '@testing-library/jest-dom'

describe('Test', () => {
  // beforeEach(() => {
  //   home = shallow(<Home username="cody" />)
  // })

  // it('renders the email in an h3', () => {
  //   expect(home.find('h3').text()).to.be.equal('Welcome, cody')
  // })
  test('renders Home component', () => {
    render(<Test />)

    screen.getByText('Hello')
    expect(screen.queryByText('Nothing')).toBeNull()
  })
})
