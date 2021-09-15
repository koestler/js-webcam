import React from 'react'

import Camera from './camera'
import { Columns, Heading, Section } from 'react-bulma-components'

const View = ({ title, name, cameras }) => {
  return (
    <Section>
      <Heading>{title}</Heading>
      <Columns>
        {cameras.map(camera=>
          <Columns.Column key={camera.name}>
            <Camera viewName={name} cameraName={camera.name} cameraTitle={camera.title} />
          </Columns.Column>
        )}
      </Columns>
    </Section>
  )
}

export default View
