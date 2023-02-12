import React from 'react'
import Header from './Header'

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <main>
      <Header />
      <section>{children}</section>
    </main>
  )
}
