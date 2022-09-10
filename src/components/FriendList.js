import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"

export default function Home() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function logoutHandler() {
    setError('')

    try {
      await logout()
      console.log('LOGGED OUT')
      navigate('/login')
    } catch {
      setError('Failed to logout')
    }
  }

  return (
    <>
      <h1>FRIEND LIST</h1>
      <p>Email: {currentUser.email}</p>
      <button onClick={logoutHandler}>Log Out</button>
    </>
  )
}