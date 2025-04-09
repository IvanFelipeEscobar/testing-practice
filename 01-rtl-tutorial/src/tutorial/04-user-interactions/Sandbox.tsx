import { useState } from 'react'
import { FaHeart, FaRegHeart, FaPlus, FaMinus } from 'react-icons/fa'

const Sandbox = () => {
  const [count, setCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const inc = () => {
    setCount(count + 1)
  }

  const dec = () => {
    if (count > 0) setCount(count - 1)
    else alert("can't go below zero")
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={inc}
        aria-label='inc'
      >
        <FaPlus className="size-12" />
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={dec} aria-label='dec'>
        <FaMinus className="size-12" />
      </button>
      <div>
        <button
          onClick={toggleLike}
          className="block mx-auto text-2xl text-red-500 mt-16"
          aria-label={isLiked ? 'like' : 'unlike'}
        >
          {isLiked ? (
            <FaHeart className="size-12" />
          ) : (
            <FaRegHeart className="size-12" />
          )}
        </button>
      </div>
    </div>
  )
}
export default Sandbox
