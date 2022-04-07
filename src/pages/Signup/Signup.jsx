import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassward] = useState();
  const [displayName, setDisplayName] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { error, isPending, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail);
  }
  const handleFileChange = (e) => {
    e.preventDefault()
    setThumbnail(null)
    let selected = e.target.files[0];
    // console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError("Please select a image file");
      return
    }
    if (selected.size > 100000) {
      setThumbnailError("Image size should be less then 100KB");
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('File uploaded');
  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        <span>Password:</span>
        <input type="password" name="password" value={password} onChange={(e) => setPassward(e.target.value)} required />
      </label>
      <label>
        <span>Display Name:</span>
        <input type="text" name="display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
      </label>
      <label>
        <span>Display Image:</span>
        <input type="file" name="image" onChange={handleFileChange} required />
        {
          thumbnailError && <div className='error'>{thumbnailError}</div>
        }
      </label>
      {
        !isPending && <button className='btn'>Signup</button>
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
