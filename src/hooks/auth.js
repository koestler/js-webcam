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

  const isViewVisible = view => {
    if (!view.hidden) return true
    const allowedViews = loginResponse?.allowedViews || []
    return allowedViews.includes(view.name)
  }

  return {
    setLoginResponse,
    logout,
    isLoggedIn,
    getUser,
    getToken,
    isViewAllowed,
    isViewVisible
  }
}
