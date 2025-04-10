import { ReviewData } from "./Sandbox"


const Reviews = ({reviews, deleteReview} : {reviews: ReviewData[]; deleteReview: ( index: number) => void}) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review, index) => (
          <article key={index} className="border p-4 rounded mb-4 relative">
            <div className="font-bold">{review.email}</div>
            <div className="text-yellow-500">
              {'⭐'.repeat(Number(review.rating))}
            </div>
            <p className="mt-2">{review.review}</p>
               <button
              onClick={() => deleteReview(index)}
              className="mt-2 bg-red-400 hover:bg-red-800 text-white p-2 rounded-md absolute top-2 right-4"
            >
              Delete
            </button>
          </article>
        ))
      )}
    </div>
  )
}
export default Reviews