import React, { useState, useEffect, createContext } from 'react'
import { getTodosURL, createTodoURL, updateTodoURL } from '../helpers/endpoints'

export const AppContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userData, setUserData] = useState(null)
  const [viewState, setViewState] = useState('login')
  const [isPending, setIsPending] = useState(false)
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    user === null
      ? setIsAuthorized(false)
      : (setIsAuthorized(true), setUserData(user), fetchTodos(user.token))
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthorized(false)
    setUserData(null)
  }

  const fetchTodos = token => {
    setIsPending(true)

    fetch(getTodosURL(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(({ err, msg }) => {
        setIsPending(false)
        console.log({ err, msg })
        setTodos(msg)
      })
      .catch(error => {
        console.error('Error:', error)
        setIsPending(false)
      })
  }

  const createTodo = args => {
    return fetch(createTodoURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(args),
    })
      .then(response => response.json())
      .then(({ err, msg }) => {
        setIsPending(false)
        console.log({ err, msg })
        return err
      })
      .catch(error => {
        console.error('Error:', error)
        setIsPending(false)
        return error
      })
  }

  const updateTodo = args => {
    return fetch(updateTodoURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(args),
    })
      .then(response => response.json())
      .then(({ err, msg }) => {
        setIsPending(false)
        console.log({ err, msg })
        return err
      })
      .catch(error => {
        console.error('Error:', error)
        setIsPending(false)
        return error
      })
  }

  return (
    <AppContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        userData,
        setUserData,
        viewState,
        setViewState,
        isPending,
        todos,
        logout,
        fetchTodos,
        createTodo,
        updateTodo,
      }}>
      {children}
    </AppContext.Provider>
  )
}
