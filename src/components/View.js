import React, { useState } from 'react'

import Camera from './Camera'
import Autoplay, { AutoplayContext } from './Autoplay'
import { Columns, Heading, Section } from 'react-bulma-components'

const View = (view) => {
  const { title, name, cameras, refreshIntervalMs, autoplay } = view
  const [play, setPlay] = useState(autoplay)

  return (
    <Section>
      <Columns>
        <Columns.Column>
          <Heading renderAs='h2'>{title}</Heading>
        </Columns.Column>
        <Columns.Column size={2}>
          <Autoplay play={play} setPlay={setPlay} refreshIntervalMs={refreshIntervalMs} />
        </Columns.Column>
      </Columns>
      <AutoplayContext.Provider value={{ play: play, setPlay: setPlay, refreshIntervalMs: refreshIntervalMs }}>
        <Columns>
          {cameras.map(camera =>
            <Columns.Column key={camera.name}>
              <Camera viewName={name} viewIsPublic={view.isPublic} cameraName={camera.name} cameraTitle={camera.title} />
            </Columns.Column>
          )}
        </Columns>
      </AutoplayContext.Provider>
    </Section>
  )
}

export default View
