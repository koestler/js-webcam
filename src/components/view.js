import React from 'react'

import Camera from './camera'
import { Columns, Heading, Section } from 'react-bulma-components'

const View = ({ title, name, cameras }) => {
  return (
    <Section>
      <Heading>{title}</Heading>
      <Columns>
        {cameras.map(camera =>
          <Columns.Column key={camera}>
            <Camera viewName={name} cameraName={camera} />
          </Columns.Column>
        )}
      </Columns>
    </Section>
  )
}

export default View
