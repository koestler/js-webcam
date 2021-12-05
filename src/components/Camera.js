import React, { useContext, useState, useEffect } from 'react'
import { Image, Message } from 'react-bulma-components'
import { AutoplayContext } from './Autoplay'
import HideableMessage from './HideableMessage'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '../hooks/auth'
import { image } from '../hooks/unauthApi'

const fetchImage = (fetch, viewName, cameraName, setImgSrc, play, refreshIntervalMs, setTimer, onError) => {
  const fetchStarted = Date.now()
  fetch(viewName, cameraName).then(blob => {
    // restart fetch image when autoplay enabled
    if (play) {
      const interval = Math.max(fetchStarted - Date.now() + refreshIntervalMs, 0)
      setTimer(setTimeout(() => {
        fetchImage(fetch, viewName, cameraName, setImgSrc, play, refreshIntervalMs, setTimer, onError)
      }, interval))
    }
    setImgSrc(blob)
  }).catch(onError)
}

const Camera = ({ viewName, viewIsPublic, cameraName, cameraTitle }) => {
  const { play, setPlay, refreshIntervalMs } = useContext(AutoplayContext)
  const [initial, setInitial] = useState(true)
  const [imgSrc, setImgSrc] = useState(null)
  const [timer, setTimer] = useState(null)
  const { ref, inView } = useInView()
  const autoplay = play && inView
  const { api } = useAuth()

  // send Authorization only for non-public images
  const fetch = viewIsPublic ? image : api.image

  useEffect(() => {
    if (initial || (autoplay && timer === null)) {
      fetchImage(fetch, viewName, cameraName, setImgSrc, autoplay, refreshIntervalMs, setTimer, error => {
        console.log('cannot fetch image: ', error)
        setPlay(false)
      })
      setInitial(false)
    }
  }, [viewName, cameraName, initial, setInitial, setImgSrc, timer, setTimer, setPlay, autoplay, refreshIntervalMs, fetch])

  // stop timeout when autoplay is stopped
  useEffect(() => {
    // stop refresh timer
    if (!autoplay) {
      clearTimeout(timer)
      setTimer(null)
    }

    // stop timeout on unmount
    return () => {
      clearTimeout(timer)
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
