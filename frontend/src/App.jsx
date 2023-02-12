import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import Layout from './layout'
import AuthPage from './pages/AuthPage'
import Landing from './pages/Landing'
import UserPanel from './pages/UserPanel'

export default function App() {
  const { isAuthorized } = useContext(AppContext)

  return (
    <Layout>
      <Routes>
        <Route index element={isAuthorized ? <UserPanel /> : <Landing />} />
        <Route path='auth' element={<AuthPage />} />
      </Routes>
    </Layout>
  )
}
