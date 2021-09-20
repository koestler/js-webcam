import React, { useContext, useState, useEffect } from 'react'
import { Image, Message } from 'react-bulma-components'
import { AutoplayContext } from './autoplay'
import HideableMessage from './hideableMessage'

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
  const {play, refreshIntervalMs} = useContext(AutoplayContext)
  const [initial, setInitial] = useState(true)
  const [imgSrc, setImgSrc] = useState(null)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (initial || (play && timer === null)) {
      fetchImage( `/api/v0/images/${viewName}/${cameraName}.jpg`, setImgSrc, play, refreshIntervalMs, setTimer)
      setInitial(false)
    }
    return () => {
      // cleanup on unmout
      clearTimeout(timer)
    }
  }, [viewName, cameraName, initial, setInitial, setImgSrc, timer, setTimer, play, refreshIntervalMs])

  useEffect(() => {
    // stop refresh timer
    if (!play) {
      clearTimeout(timer)
      setTimer(null)
    }
  }, [play, timer, setTimer])

  return (
    <HideableMessage header={<p>{cameraTitle}</p>}>
      <Message.Body>
        {imgSrc && <Image src={imgSrc} />}
      </Message.Body>
    </HideableMessage>
  )
}

export default Camera
