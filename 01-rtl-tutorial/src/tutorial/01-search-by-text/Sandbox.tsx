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
      <p>you cna search me with regex: 123-444-5678</p>
      <button onClick={() => setShowError(!showError)}>click me</button>

      {showError && <p>error message</p>}
      <ul>
        <li>item1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
        <li>item 5</li>
      </ul>
      {showMessage && <p>async message</p>}
    </div>
  )
}
export default Sandbox
