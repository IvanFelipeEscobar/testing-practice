import { useEffect, useState } from 'react'

const Sandbox = () => {
  const [showAsync, setAsync] = useState(false)
  const [showError, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAsync(true)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      
      <nav>
        <a href="/">home</a>
        <a href="/about">about</a>
      </nav>

      <h1>main heading</h1>
      <h2>sub heading</h2>

      <img src="example.jpg" alt="example" />
      <button onClick={() => setError(!showError)}>click me</button>
      <button>submit</button>
      <button>clear</button>

      {showError && <button>error</button>}
      {showAsync && <button>async</button>}
    </div>
  )
}
export default Sandbox
