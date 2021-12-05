import React, { useContext, useState, useEffect } from 'react'
import { Image, Message } from 'react-bulma-components'
import { AutoplayContext } from './Autoplay'
import HideableMessage from './HideableMessage'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '../hooks/auth'

const fetchImage = (auth, imgUrl, setImgSrc, play, refreshIntervalMs, setTimer) => {
  const fetchStarted = Date.now()

  const requestOptions = { method: 'GET' }
  const token = auth.getToken()
  if (token) {
    requestOptions.headers = { Authorization: token }
  }

  window.fetch(imgUrl, requestOptions)
    .then(response => {
      // restart fetch image when autoplay enabled
      if (play) {
        const fetchTime = Date.now() - fetchStarted
        const interval = Math.max(refreshIntervalMs - fetchTime, 0)
        setTimer(setTimeout(() => fetchImage(auth, imgUrl, setImgSrc, play, refreshIntervalMs, setTimer), interval))
      }
      return response.blob()
    })
    .then(blob => new Promise(resolve => {
      const reader = new window.FileReader()
      reader.onload = function () { resolve(this.result) }
      reader.readAsDataURL(blob)
    }))
    .then(setImgSrc)
    .catch(() => setImgSrc(null))
}

const Camera = ({ viewName, cameraName, cameraTitle }) => {
  const { play, refreshIntervalMs } = useContext(AutoplayContext)
  const [initial, setInitial] = useState(true)
  const [imgSrc, setImgSrc] = useState(null)
  const [timer, setTimer] = useState(null)
  const { ref, inView } = useInView()
  const autoplay = play && inView
  const auth = useAuth()

  useEffect(() => {
    if (initial || (autoplay && timer === null)) {
      fetchImage(auth, `/api/v0/images/${viewName}/${cameraName}.jpg`, setImgSrc, autoplay, refreshIntervalMs, setTimer)
      setInitial(false)
    }
    return () => {
      // cleanup on unmount
      clearTimeout(timer)
    }
  }, [viewName, cameraName, initial, setInitial, setImgSrc, timer, setTimer, autoplay, refreshIntervalMs, auth])

  useEffect(() => {
    // stop refresh timer
    if (!autoplay) {
      clearTimeout(timer)
      setTimer(null)
    }
  }, [autoplay, timer, setTimer])

  return (
    <HideableMessage header={<p>{cameraTitle}</p>}>
      <Message.Body>
        <div ref={ref}>
          {imgSrc && <Image src={imgSrc} />}
        </div>
      </Message.Body>
    </HideableMessage>
  )
}

export default Camera
