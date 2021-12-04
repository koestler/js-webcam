import React, { useState, useContext, createContext } from 'react'

// todo: save / load authContex
// const authStorage = window.sessionStorage
// const storageKey = 'authenticatedUser'
//       authStorage.setItem(storageKey, JSON.stringify(body))
//   const loginResponse = JSON.parse(authStorage.getItem(storageKey))

const authContext = createContext(null)

export function AuthProvider ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth () {
  const [loginResponse, setLoginResponse] = useState(null)

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
    if (loginResponse === null) return null
    return loginResponse.user
  }

  return {
    loginResponse,
    isLoggedIn,
    getUser,
    login,
    logout
  }
}
