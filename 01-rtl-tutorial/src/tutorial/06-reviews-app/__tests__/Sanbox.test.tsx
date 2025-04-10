import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getFormElements } from './Form.test'
import Sandbox from '../Sandbox'

describe('Reviews App', () => {
  test('heading renders', () => {
    render(<Sandbox />)
    expect(
      screen.getByRole('heading', { level: 1, name: /reviews app/i })
    ).toBeInTheDocument()
  })

  test('new review when form is submitted', async () => {
    const user = userEvent.setup()
    render(<Sandbox />)
    const {emailInput, ratingInput, reviewInput, submitBtn} = getFormElements()

    const reviews = screen.queryAllByRole('article')
    expect(reviews).toHaveLength(0)

    await user.type(emailInput, 'email@email.com')
    await user.selectOptions(ratingInput, '5')
    await user.type(reviewInput, 'this is a valid review!!!!')
    await user.click(submitBtn)

    expect(screen.getAllByRole('article')).toHaveLength(1)

    //expect(screen.getByText('email@email.com')).toBeInTheDocument() ...
  })


})
