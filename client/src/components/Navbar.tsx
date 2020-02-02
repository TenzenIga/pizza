import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export default function Navbar() {
    const {user, isLoggedIn} =  useContext(UserContext)
    return (
        <nav className='navbar'>
        <div className='navbar-item main-menu'>
          <Link to='/' >Pizza</Link>  
        </div>
        <div className='navbar-item'>
          <Link to="/cart">Cart</Link>

         {isLoggedIn ? <Link to="/userpage">{user.username}</Link> : <Link to="/login">Login</Link>}
        </div>
      </nav>
    )
}
