import { useAuth } from './auth'
import { useHistory } from 'react-router-dom'

export const useAuthFetchWrapper = () => {
  const { getToken, logout } = useAuth()
  const history = useHistory()

  const request = (method) => {
    return (url, body) => {
      const requestOptions = { method }

      const token = getToken()
      if (token) {
        requestOptions.headers = { Authorization: token }
      }

      requestOptions.body = body
      return window.fetch(url, requestOptions).then(handleResponse)
    }
  }

  const handleResponse = (response) => {
    if (!response.ok) {
      console.log('handleResponse: ', response)
      if (response.status === 401 && getToken() !== null) {
        logout()

        // send user to login page
        history.push('/login')
      }
      return Promise.reject(response.statusText)
    }

    return response
  }

  return {
    authGet: request('GET')
  }
}
