import { useEffect, useState } from 'react'
import axios from 'axios'

const unauthApi = axios.create()

export const useConfig = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unauthApi('/api/v0/config')
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
