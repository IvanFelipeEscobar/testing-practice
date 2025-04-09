import { render, screen } from '@testing-library/react'

import userEvent, { type UserEvent } from '@testing-library/user-event'
import Sandbox from './Sandbox'

const getFormElement = () => {
  return {
    emailInput: screen.getByRole('textbox', { name: 'Email' }),
    passwordInput: screen.getByLabelText('Password'),
    confirmPasswordInput: screen.getByLabelText(/confirm/i),
    submitBtn: screen.getByRole('button', { name: /submit/i }),
  }
}

describe('form testing', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    render(<Sandbox />)
  })

  test('check for default empty emails', () => {
    const { emailInput, passwordInput, confirmPasswordInput } = getFormElement()

    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(confirmPasswordInput).toHaveValue('')
  })

  test('type in inputs working', async () => {
    const { emailInput, passwordInput, confirmPasswordInput } = getFormElement()

    await user.type(emailInput, 'test@test.test')
    expect(emailInput).toHaveValue('test@test.test')

    await user.type(passwordInput, 'secret')
    expect(passwordInput).toHaveValue('secret')

    await user.type(confirmPasswordInput, 'secret')
    expect(passwordInput).toHaveValue('secret')
  })

  test('show error with invalid email', async () => {
    const { emailInput, submitBtn } = getFormElement()
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await user.type(emailInput, 'notemail')
    await user.click(submitBtn)

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })

  test('show error if invalid password', async () => {
    const { emailInput, submitBtn, passwordInput } = getFormElement()

    expect(screen.queryByText(/must be/i)).not.toBeInTheDocument()

    await user.type(emailInput, 'valid@email.com')
    await user.type(passwordInput, '1234')
    await user.click(submitBtn)

    expect(screen.getByText(/must be/i)).toBeInTheDocument()
  })

  test("show error if passwords don't match", async () => {
    const { emailInput, submitBtn, passwordInput, confirmPasswordInput } =
      getFormElement()
    expect(screen.queryByText(/match/i)).not.toBeInTheDocument()

    await user.type(emailInput, 'valid@email.com')
    await user.type(passwordInput, '12345')
    await user.type(confirmPasswordInput, '12346')
    await user.click(submitBtn)

    expect(screen.getByText(/match/i)).toBeInTheDocument()
  })

  test('confirm succesful submit', async () => {
    const { emailInput, submitBtn, passwordInput, confirmPasswordInput } =
      getFormElement()

    await user.type(emailInput, 'valid@email.com')
    await user.type(passwordInput, '12345')
    await user.type(confirmPasswordInput, '12345')
    await user.click(submitBtn)

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/must be/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/match/i)).not.toBeInTheDocument()
    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(confirmPasswordInput).toHaveValue('')
  })
})
