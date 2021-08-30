import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button, Image, Message } from 'react-bulma-components'

const Camera = ({ viewName, cameraName }) => {
  const [play, setPlay] = useState(false)
  const [hide, setHide] = useState(false)

  let playButton = null
  let body = null
  if (!hide) {
    playButton = (
      <Button onClick={() => setPlay(!play)}>
        <FontAwesomeIcon icon={play ? faStop : faPlay} />
      </Button>
    )
    body = (
      <Message.Body>
        <Image src={`/api/v0/images/${viewName}/${cameraName}.jpg`} />
      </Message.Body>
    )
  }

  return (
    <Message color='dark'>
      <Message.Header>
        <p>{cameraName}</p>
        {hide || playButton}
        <Button onClick={() => setHide(!hide)}>
          <FontAwesomeIcon icon={hide ? faEyeSlash : faEye} />
        </Button>
      </Message.Header>
      {hide || body}
    </Message>
  )
}

export default Camera
