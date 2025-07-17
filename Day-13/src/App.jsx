import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './features/auth/authSlice'

function App() {
  const [username, setUsername] = useState('')
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username.trim() !== '') {
      dispatch(login({ username }))
      setUsername('')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Redux Login (Vite)</h1>

      {user ? (
        <>
          <h2>Welcome, {user.username} 👋</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" style={{ marginLeft: '10px' }}>
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default App
