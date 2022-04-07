import React from 'react'
import './Navbar.css'
import Logo from '../../assets/temple.svg'
import { useLogout } from '../../hooks/useLogout'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()
  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <img src={Logo} alt='dojo logo' />
          <span>The Dojo</span>
        </li>
        {
          !user ? (
            <>
              <li><Link to={'/login'} >Login</Link></li>
              <li><Link to={'/signup'} >Signup</Link></li>
            </>
          ) : null
        }
        <li>
          {
            user && (
              <>
                {
                  !isPending && <button className='btn' onClick={() => logout()}>Logout</button>
                }
                {
                  isPending && <button className='btn' disabled >Loging out...</button>
                }
              </>
            )
          }
        </li>
      </ul>
    </div>
  )
}
