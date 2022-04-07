import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';
import './Login.css'


export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassward] = useState();
  const { isPending, error, login } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        <span>Password:</span>
        <input type="password" name="password" value={password} onChange={(e) => setPassward(e.target.value)} required />
      </label>
      {
        !isPending && <button className='btn'>Login</button>
      }
      {
        isPending && <button className='btn' disabled>Loading...</button>
      }
      {
        error && <div className="error">{error}</div>
      }
    </form>
  )
}
