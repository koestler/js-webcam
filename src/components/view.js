import React, { useState } from 'react'

import Camera from './camera'
import Autoplay, { AutoplayContext } from './autoplay'
import { Columns, Heading, Section } from 'react-bulma-components'

const View = ({ title, name, cameras, refreshIntervalMs, autoplay }) => {
  const [play, setPlay] = useState(autoplay)

  return (
    <Section>
      <Heading>{title}</Heading>
      <Autoplay play={play} setPlay={setPlay} refreshIntervalMs={refreshIntervalMs} />
      <AutoplayContext.Provider value={{ play: play, refreshIntervalMs: refreshIntervalMs }}>
        <Columns>
          {cameras.map(camera =>
            <Columns.Column key={camera.name}>
              <Camera viewName={name} cameraName={camera.name} cameraTitle={camera.title} />
            </Columns.Column>
          )}
        </Columns>
      </AutoplayContext.Provider>
    </Section>
  )
}

export default View
