import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './auth'

const unauthApi = axios.create()

export const useConfig = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unauthApi.get('/api/v0/config')
        setData(response.data)
        setSuccess(true)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    fetchData()
  }, [])

  return { config: data, success, error }
}

export const useLogin = () => {
  const { setLoginResponse } = useAuth()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const login = async (user, password) => {
    setSuccess(false)
    setError(false)
    try {
      const response = await unauthApi.post('/api/v0/login', { user, password })
      setLoginResponse(response.data)
      setSuccess(true)
    } catch (error) {
      setError(error.response.statusText)
    }
  }

  return { login, success, error }
}
