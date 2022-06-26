import React from 'react'
import { Button } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

export const AutoplayContext = React.createContext({ play: false, refreshIntervalMs: 0 })

const Autoplay = ({ play, setPlay }) => {
  return (
    <Button.Group align='right'>
      <Button onClick={() => setPlay(!play)}>
        <FontAwesomeIcon icon={play ? faStop : faPlay} />
      </Button>
    </Button.Group>
  )
}

export default Autoplay
