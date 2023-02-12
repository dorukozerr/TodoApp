import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

export default function Header() {
  const { isAuthorized, logout, setViewState } = useContext(AppContext)

  return (
    <header>
      <div className='headerContainer'>
        <div className='left'>
          <Link to='/'>
            <h2>Case Study</h2>
          </Link>
        </div>
        <div className='right'>
          {isAuthorized ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to='/auth'>
                <button onClick={() => setViewState('login')}>Login</button>
              </Link>
              <Link to='/auth'>
                <button onClick={() => setViewState('register')}>
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
