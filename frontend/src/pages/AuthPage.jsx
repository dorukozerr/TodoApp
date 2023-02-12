import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Puff } from 'react-loading-icons'
import { loginURL, registerURL } from '../helpers/endpoints'

export default function AuthPage() {
  let [params] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthorized, setIsAuthorized, setUserData, viewState, fetchTodos } =
    useContext(AppContext)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isPwVisible, setIsPwVisible] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [warningMsg, setWarningMsg] = useState('')

  useEffect(() => {
    setEmail('')
    setName('')
    setPassword('')
    setPasswordConfirmation('')
    setIsPwVisible(false)
  }, [viewState])

  useEffect(() => {
    isAuthorized && navigate('/')
  }, [isAuthorized])

  const setErr = msg => {
    setErrMsg(msg)
    setTimeout(() => {
      setErrMsg('')
    }, 5000)
  }

  const loginForm = (
    <form
      onSubmit={e => {
        e.preventDefault()

        if (email !== '' && password !== '') {
          setIsPending(true)
          fetch(loginURL(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
            .then(response => response.json())
            .then(({ err, msg }) => {
              setIsPending(false)

              err
                ? setErr(msg)
                : (localStorage.setItem('user', JSON.stringify(msg)),
                  setUserData(msg),
                  setIsAuthorized(true),
                  navigate('/'),
                  fetchTodos(msg.token))
            })
            .catch(error => {
              console.error('Error:', error)
              setIsPending(false)
            })
        }
      }}>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
      />
      <div className='pwContainer'>
        <input
          type={isPwVisible ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <div className='btn' onClick={() => setIsPwVisible(!isPwVisible)}>
          {isPwVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
      {params.get('v') && <p className='text-center'>Email Verified</p>}
      {errMsg !== '' && <span className='errMsg'>{errMsg}</span>}
      <button>{isPending ? <Puff /> : 'Login'}</button>
    </form>
  )

  const registerForm = (
    <form
      onSubmit={e => {
        e.preventDefault()

        if (
          email !== '' &&
          name !== '' &&
          password !== '' &&
          passwordConfirmation !== ''
        ) {
          fetch(registerURL(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password }),
          })
            .then(response => response.json())
            .then(({ err, msg }) => {
              setIsPending(false)

              err
                ? setErr(msg)
                : setWarningMsg(
                    'Please check your email to verify your account'
                  )
            })
            .catch(error => {
              console.error('Error:', error)
              setIsPending(false)
            })
        }
      }}>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Name'
      />
      <div className='pwContainer'>
        <input
          type={isPwVisible ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <div className='btn' onClick={() => setIsPwVisible(!isPwVisible)}>
          {isPwVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
      <div className='pwContainer'>
        <input
          type={isPwVisible ? 'text' : 'password'}
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          placeholder='Password Confirmation'
        />
        <div className='btn' onClick={() => setIsPwVisible(!isPwVisible)}>
          {isPwVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
      <button>{isPending ? <Puff /> : 'Register'}</button>
    </form>
  )

  return (
    <div className='authFormWrapper'>
      {viewState === 'login' ? (
        loginForm
      ) : viewState === 'register' && warningMsg !== '' ? (
        <>{warningMsg}</>
      ) : (
        registerForm
      )}
    </div>
  )
}
