import validator from 'validator'
import { ReviewData } from './Sandbox'
import { useState } from 'react'

const initalState = {
  email: '',
  rating: '',
  review: '',
}

const Form = ({ addReview }: { addReview: (review: ReviewData) => void }) => {
  const [review, setReview] = useState<ReviewData>(initalState)
  const [err, setErr] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setReview({ ...review, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!validator.isEmail(review.email)) return setErr('Invalid email...')
    if (!review.rating) return setErr('Please select a star rating...')
    if (review.review.length < 10)
      return setErr('Review must be atleast 10 characters long...')
    setErr('')
    addReview(review)
    setReview(initalState)
  }

  return (
    <form className="space-y-3 border shadow-md rounded p-8 max-w-md mx-auto mt-10">
      <div className="mb-2">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-stone-900 rounded-md p-2"
          value={review.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="rating" className="block mb-2">
          Rating
        </label>
        <select
          name="rating"
          id="rating"
          value={review.rating}
          onChange={handleChange}
          className=" w-full border border-stone-900 rounded-md px-6 py-1"
          required
        >
          <option value="">Select rating</option>
          {[5, 4, 3, 2, 1].map((i) => (
            <option key={i} value={i}>
              {i} star{i !== 1 && 's'}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="review" className="block mb-2">
          Your Review
        </label>
        <textarea
          name="review"
          id="review"
          value={review.review}
          onChange={handleChange}
          className="border border-stone-900 rounded-md w-full p-2"
          rows={4}
          required
        ></textarea>
      </div>
      {err && <p className="text-red-500 font-bold">{err}</p>}
      <button onClick={handleSubmit} className='bg-blue-600 hover:bg-blue-400 px-8 py-1 rounded-md text-white'>Submit</button>
    </form>
  )
}
export default Form
