import { render, screen } from '@testing-library/react'
import Sandbox from './Sandbox'

describe('search by text', () => {
  test('different query methods', async () => {
    render(<Sandbox />)
    screen.debug()

    expect(screen.getByText('RTL examples')).toBeInTheDocument() //matches h1 so should pass

    const matchPhoneNumber = /\d{3}-\d{3}-\d{4}/
    expect(screen.getByText(matchPhoneNumber)).toBeInTheDocument() //should match phone number in p

    const err = screen.queryByText('error message')
    expect(err).not.toBeInTheDocument()

    const items = screen.getAllByText('item')
    expect(items).toHaveLength(5)

    // expect(screen.getByText('async message')).toBeInTheDocument() //will fail

    expect(await screen.findByText('async message')).toBeInTheDocument() //will pass
  })
})
