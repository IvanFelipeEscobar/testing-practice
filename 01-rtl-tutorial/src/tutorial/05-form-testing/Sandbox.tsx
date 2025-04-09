import { useState } from 'react'
import validator from 'validator'

const labelStyles = 'block text-grey-700 font-medium mb-2'
const inputStyles = 'w-full px-3 py-2 border border-gray-300 rounded-md'
const buttonsStyles =
  'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'

const defaultState = {
  email: '',
  password: '',
  confirmPassword: '',
}

const Sandbox = () => {
  const [user, setUser] = useState(defaultState)

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!validator.isEmail(user.email)) return setError('Invalid email')

    if (!validator.isLength(user.password, { min: 5 }))
      return setError('Password must be atleast 5 characters long')

    if (user.password !== user.confirmPassword)
      return setError('Password do not match')

    setError('')
    setUser(defaultState)
  }

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-4">
        <div className="mb-3">
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            name="email"
            className={inputStyles}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className={labelStyles}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            className={inputStyles}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className={labelStyles}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            className={inputStyles}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="button" onClick={handleSubmit} className={buttonsStyles}>
          Submit
        </button>
      </form>
    </div>
  )
}
export default Sandbox
