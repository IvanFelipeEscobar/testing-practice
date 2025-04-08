import { screen, render, logRoles } from '@testing-library/react'
import Sandbox from './Sandbox'

describe('testing by role examples', () => {
  test('nav &&nav links', () => {
    const { container } = render(<Sandbox />)
    logRoles(container)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'about' })).toBeInTheDocument()
  })

  test('heading hierarchy', () => {
    render(<Sandbox />)
    expect(screen.getByRole('heading', { name: 'main heading', level: 1 }))
    expect(screen.getByRole('heading', { name: 'sub heading', level: 2 }))
  })

  test('img with alt', () => {
    render(<Sandbox />)
    expect(screen.getByRole('img', { name: 'example' })).toBeInTheDocument()
  })

  test('btns to render', () => {
    render(<Sandbox />)
    expect(screen.getByRole('button', { name: 'click me' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument()
  })

  test('error btn', () => {
    render(<Sandbox/>)
    expect(screen.queryByRole('button', {name: 'error'})).not.toBeInTheDocument()
  })

  test('async btn', async () => {
    render(<Sandbox />)
    expect(screen.queryByRole('button', {name: 'async'})).not.toBeInTheDocument()
    expect(await screen.findByRole('button', {name: 'async'}))
  })
})
