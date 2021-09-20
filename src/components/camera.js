import React, { useContext, useState, useEffect } from 'react'

import { Image, Message } from 'react-bulma-components'
import { AutoplayContext } from './autoplay'
import HideableMessage from './hideableMessage'

const Camera = ({ viewName, cameraName, cameraTitle }) => {
  const autoplay = useContext(AutoplayContext)
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    const imgUrl = `/api/v0/images/${viewName}/${cameraName}.jpg`
    window.fetch(imgUrl)
      .then(response => response.blob())
      .then(blob => new Promise(resolve => {
        const reader = new window.FileReader()
        reader.onload = function () { resolve(this.result) }
        reader.readAsDataURL(blob)
      }))
      .then(setImgSrc)
  }, [viewName, cameraName])

  return (
    <HideableMessage header={<p>{cameraTitle}</p>}>
      <Message.Body>
        {imgSrc && <Image src={imgSrc} />}
        {autoplay.play && <p>refresh every {autoplay.refreshIntervalMs}</p>}
      </Message.Body>
    </HideableMessage>
  )
}

export default Camera
