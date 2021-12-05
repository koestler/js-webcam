import axios from 'axios'

export const useImage = () => {
  const fetch = async (viewName, cameraName) => {
    try {
      const response = await axios.get(
        `/api/v0/images/${viewName}/${cameraName}.jpg`,
        { responseType: 'blob' }
      )
      const p = new Promise(resolve => {
        const reader = new window.FileReader()
        reader.onload = function () { resolve(this.result) }
        reader.readAsDataURL(response.data)
      })
      return await p
    } catch (error) {
      console.log('cannot fetch image: ', error)
      return null
    }
  }

  return { fetch }
}
