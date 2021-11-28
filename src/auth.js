const authStorage = window.localStorage
const storageKey = 'authenticatedUser'

export const login = async (user, password) => {
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
      authStorage.setItem(storageKey, JSON.stringify(body))
      return null
    } else {
      return 'login failed: ' + body.message
    }
  } catch (err) {
    return 'cannot login: ' + err
  }
}

export const logout = () => {
  authStorage.removeItem(storageKey)
}

export const getLoginResponse = () => {
  const loginResponse = JSON.parse(authStorage.getItem(storageKey))
  return loginResponse
}
