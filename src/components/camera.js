import React, { useContext, useState, useEffect } from 'react'
import { Image, Message } from 'react-bulma-components'
import { AutoplayContext } from './autoplay'
import HideableMessage from './hideableMessage'
import { useInView } from 'react-intersection-observer'

const fetchImage = (imgUrl, setImgSrc, play, refreshIntervalMs, setTimer) => {
  const fetchStarted = Date.now()
  window.fetch(imgUrl)
    .then(response => {
      // restart fetch image when autoplay enabled
      if (play) {
        const fetchTime = Date.now() - fetchStarted
        const interval = Math.max(refreshIntervalMs - fetchTime, 0)
        setTimer(setTimeout(() => fetchImage(imgUrl, setImgSrc, play, refreshIntervalMs, setTimer), interval))
      }
      return response.blob()
    })
    .then(blob => new Promise(resolve => {
      const reader = new window.FileReader()
      reader.onload = function () { resolve(this.result) }
      reader.readAsDataURL(blob)
    }))
    .then(setImgSrc)
}

const Camera = ({ viewName, cameraName, cameraTitle }) => {
  const { play, refreshIntervalMs } = useContext(AutoplayContext)
  const [initial, setInitial] = useState(true)
  const [imgSrc, setImgSrc] = useState(null)
  const [timer, setTimer] = useState(null)
  const { ref, inView } = useInView()
  const autoplay = play && inView

  useEffect(() => {
    if (initial || (autoplay && timer === null)) {
      fetchImage(`/api/v0/images/${viewName}/${cameraName}.jpg`, setImgSrc, autoplay, refreshIntervalMs, setTimer)
      setInitial(false)
    }
    return () => {
      // cleanup on unmount
      clearTimeout(timer)
    }
  }, [viewName, cameraName, initial, setInitial, setImgSrc, timer, setTimer, autoplay, refreshIntervalMs])

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
