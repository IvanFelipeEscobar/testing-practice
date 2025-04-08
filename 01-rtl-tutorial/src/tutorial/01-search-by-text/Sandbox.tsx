import { useEffect, useState } from 'react'

const Sandbox = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div>
      <h1>RTL examples</h1>
      <p>you can search me with regex: 123-444-5678</p>

      <button onClick={() => setShowError(!showError)}>click me</button>

      {showError && <p>error message</p>}
      <ul>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ul>
      {showMessage && <p>async message</p>}
    </div>
  )
}
export default Sandbox
