import React, { useState, useContext, createContext } from 'react'

// store current token not only in react state but also in sessionStorage
const authStorage = window.sessionStorage
const storageKey = 'authenticatedUser'
const storeLoginResponse = loginResponse => {
  authStorage.setItem(storageKey, JSON.stringify(loginResponse))
}
const initialLoginResponse = JSON.parse(authStorage.getItem(storageKey))

// setup react context API
const authContext = createContext(null)

export function AuthProvider ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth () {
  const [loginResponse, setLoginResponseState] = useState(initialLoginResponse)

  const setLoginResponse = loginResponse => {
    setLoginResponseState(loginResponse)
    storeLoginResponse(loginResponse)
  }

  const login = async (user, password) => {
    try {
      const response = await window.fetch('/api/v0/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, password })
      })

      const body = await response.json()

      if (response.ok) {
        setLoginResponse(body)
        return null
      } else {
        return 'login failed: ' + body.message
      }
    } catch (err) {
      return 'cannot login: ' + err
    }
  }

  const logout = () => setLoginResponse(null)

  const isLoggedIn = () => loginResponse !== null

  const getUser = () => {
    return loginResponse?.user
  }

  const getToken = () => {
    return loginResponse?.token
  }

  const isViewAllowed = view => {
    const allowedViews = loginResponse?.allowedViews || []
    return view.isPublic || allowedViews.includes(view.name)
  }

  return {
    isLoggedIn,
    getUser,
    getToken,
    login,
    logout,
    isViewAllowed
  }
}
