import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ logoutUser, isUserLoggedIn }) => {
  if (isUserLoggedIn) {
    return (
      <nav>
        <Link to='/' >Home</Link>{" "}
        <Link to='/users' >Users</Link>{" "}
        <button onClick={logoutUser}>Log-Out</button>
      </nav>
    )
  } else {
    return (
      <nav>
        <Link to='/' >Home</Link>{" "}
        <Link to='/login' >Log-In</Link>{" "}
        <Link to='/signup' >Sign-Up</Link>{" "}
      </nav>
    )
  }
}

export default Navbar
