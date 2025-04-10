import { render, screen } from '@testing-library/react'

import App from '../App'

describe('App Component', () => {
// Test if heading renders correctly
test('should render heading with correct text', () => {
  // Render the App component
  render(<App />)

  // Log the DOM tree for debugging
  screen.debug()

  // Find heading by its text content
  // const heading = screen.getByText('React Testing Library')

  // Verify heading exists in document
  // expect(heading).toBeInTheDocument()
})

// test('this test will pass', () => {
//   const sum = 1+1
//   expect(sum).toBe(2)
// })

// test('this test will fail', () => {
// // throw new Error('forced error')
// const sum = 1+1
// expect(sum).toBe(5)
// })

// test('test paragraph', () => {
//   render(<App />)
//   screen.debug()
//   const p = screen.getByText(/paragraph/)
//   expect(p).toBeInTheDocument()
// })
})