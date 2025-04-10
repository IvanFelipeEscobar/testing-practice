import { useEffect, useState } from 'react'
import Form from './Form'
import Reviews from './Reviews'

export type ReviewData = {
  email: string
  rating: string
  review: string
}

const Sandbox = () => {
  const [reviews, setReviews] = useState<ReviewData[]>(
    JSON.parse(localStorage.getItem('reviews') as string) || []
  )

  const addReview = (review: ReviewData) => {
    setReviews([...reviews, review])
  }

  const deleteReview = (index: number) => {
    const updated = reviews.filter((_, i) => i !== index)
    setReviews(updated)
  }

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])
  return (
    <div>
      <h2 className="text-2xl">Reviews App</h2>
      <Form addReview={addReview} />
      <Reviews reviews={reviews} deleteReview={deleteReview}/>
    </div>
  )
}
export default Sandbox
