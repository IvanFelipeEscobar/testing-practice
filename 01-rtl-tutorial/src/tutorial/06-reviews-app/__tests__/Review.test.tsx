import { render, screen } from '@testing-library/react'
import Reviews from '../Reviews'
import { ReviewData } from '../Sandbox'
import userEvent from '@testing-library/user-event'

const mockReviews: ReviewData[] = [
  {
    email: 'new@email.com',
    rating: '5',
    review: 'very good review, i love it',
  },
  {
    email: 'other@email.com',
    rating: '3',
    review: 'very bad review, i hate it',
  },
]

describe('Reviews component', () => {
  test('render heading', () => {
    render(<Reviews reviews={[]} deleteReview={vi.fn()} />)
    screen.debug()
    expect(
      screen.getByRole('heading', { level: 2, name: /reviews/i })
    ).toBeInTheDocument()
  })

  test('display no revews when array is empty', () => {
    render(<Reviews reviews={[]} deleteReview={vi.fn()} />)
    expect(screen.getByText('No reviews yet')).toBeInTheDocument()
  })

  test('renders reviews properly', () => {
    render(<Reviews reviews={mockReviews} deleteReview={vi.fn()} />)
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument()
      expect(screen.getByText(review.review)).toBeInTheDocument()
      expect(
        screen.getByText('⭐'.repeat(Number(review.rating)))
      ).toBeInTheDocument()
    })
  })

  test('delete button delets review', async () => {
    const user = userEvent.setup()
    const deleteMock = vi.fn()
    render(<Reviews reviews={mockReviews} deleteReview={deleteMock} />)

    const deleteButtons = screen.getAllByText('Delete')
    await user.click(deleteButtons[0])
    expect(deleteMock).toHaveBeenCalledWith(0)
  })
})
