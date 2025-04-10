import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '../Form'

export const getFormElements = () => ({
  emailInput: screen.getByRole('textbox', { name: /email/i }),
  ratingInput: screen.getByRole('combobox', { name: /rating/i }),
  reviewInput: screen.getByRole('textbox', { name: /your review/i }),
  submitBtn: screen.getByRole('button', { name: /submit/i }),
})

describe('Form component', () => {
  const mockSubmit = vi.fn()
  beforeEach(() => {
    mockSubmit.mockClear()
  })

  test('renders elements correctly', () => {
    render(<Form addReview={mockSubmit} />)
    const { emailInput, ratingInput, reviewInput, submitBtn } =
      getFormElements()
    expect(emailInput).toHaveValue('')
    expect(ratingInput).toHaveValue('')
    expect(reviewInput).toHaveValue('')
    expect(submitBtn).toBeInTheDocument()
  })

  test('show error with invalid email', async () => {
    render(<Form addReview={mockSubmit} />)
    const { emailInput, submitBtn } = getFormElements()
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await userEvent.type(emailInput, 'not an email')
    await userEvent.click(submitBtn)
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('show error when no rating is selected', async () => {
    render(<Form addReview={mockSubmit} />)
    const { emailInput, submitBtn, ratingInput } = getFormElements()
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await userEvent.type(emailInput, 'valid@email.com')
    await userEvent.selectOptions(ratingInput, '')
    await userEvent.click(submitBtn)
    expect(screen.getByText(/please select/i)).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('show error when review is less than 10 characters long', async () => {
    render(<Form addReview={mockSubmit} />)
    const { emailInput, submitBtn, ratingInput, reviewInput } =
      getFormElements()
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await userEvent.type(emailInput, 'valid@email.com')
    await userEvent.selectOptions(ratingInput, '5')
    await userEvent.type(reviewInput, 'too short')
    await userEvent.click(submitBtn)

    expect(screen.getByText(/10 characters long/i)).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('submition success with valid data', async () => {
    render(<Form addReview={mockSubmit} />)
    const { emailInput, submitBtn, ratingInput, reviewInput } =
      getFormElements()
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await userEvent.type(emailInput, 'valid@email.com')
    await userEvent.selectOptions(ratingInput, '5')
    await userEvent.type(reviewInput, 'valid review that is long enough')
    await userEvent.click(submitBtn)

    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'valid@email.com',
      rating: '5',
      review: 'valid review that is long enough',
    })
  })
})
