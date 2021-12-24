import React, { useContext, useState, useEffect } from 'react'
import { Image, Message } from 'react-bulma-components'
import { AutoplayContext } from './Autoplay'
import HideableMessage from './HideableMessage'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '../hooks/auth'
import { image } from '../hooks/unauthApi'

const fetchImage = (fetch, viewName, cameraName, setImgSrc, play, refreshIntervalMs, setTimer, onError) => {
  const fetchStarted = new Date()
  console.log(`view=${viewName}, camera=${cameraName} : fetchStarted=` + fetchStarted.toISOString())
  fetch(viewName, cameraName).then(({ blob, nextImageAt }) => {
    // restart fetch image when autoplay enabled
    if (play) {
      // compute when to do next fetch
      let interval = refreshIntervalMs

      // fetch next time at last time fetch was started + refresh interval
      interval = Math.max(0, Math.min(refreshIntervalMs, fetchStarted.getTime() + refreshIntervalMs - Date.now() ))

      // when next-image-at header is received and refreshInterval > 2s; use that time
      if (nextImageAt !== null && refreshIntervalMs > 2000) {
        const nextFetch = new Date(nextImageAt)
        interval = nextFetch.getTime() - Date.now()
        interval = Math.max(refreshIntervalMs / 2, Math.min(refreshIntervalMs, interval))
      }
      console.log(`view=${viewName}, camera=${cameraName} : interval=` + interval)

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
