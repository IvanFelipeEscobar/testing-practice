import { screen, render, logRoles, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sandbox from './Sandbox'

describe('user interface testing', () => {
  test(' screen debug', () => {
    const { container } = render(<Sandbox />)
    screen.debug()
    logRoles(container)
  })

  test(' count changes using fireEvent', () => {
    render(<Sandbox />)
    const inc = screen.getByRole('button', { name: 'inc' })
    const dec = screen.getByRole('button', { name: 'dec' })
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()

    fireEvent.click(inc)
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()

    fireEvent.click(dec)
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    fireEvent.click(dec)
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument() //make sure count doesn't go below 0
  })

  test('change count using userEvent', async () => {
    render(<Sandbox />)
    const user = userEvent.setup()

    const inc = screen.getByRole('button', { name: 'inc' })
    const dec = screen.getByRole('button', { name: 'dec' })

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()

    await user.click(inc)
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()

    await user.click(dec)
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
    await user.click(dec)
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
  })

  test('toggle like button fireEvent', () => {
    render(<Sandbox />)
    const unlike = screen.getByRole('button', { name: 'unlike' })
    expect(unlike).toBeInTheDocument()
    expect(screen.queryByRole('button', {name: 'like'})).not.toBeInTheDocument()

    fireEvent.click(unlike)
    const like = screen.getByRole('button', { name: 'like' })
    expect(like).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'unlike' })
    ).not.toBeInTheDocument()

  })

  test('toggle button userEvent', async () => {
    render(<Sandbox />)
    const user = userEvent.setup()
    const unlike = screen.getByRole('button', { name: 'unlike' })
    expect(unlike).toBeInTheDocument()

    await user.click(unlike)
    const like = screen.getByRole('button', { name: 'like' })
    expect(like).toBeInTheDocument()
  })
})
