import React from 'react'

import Image from '../image'
import { Block, Section } from 'react-bulma-components'

const View = ({ title, name, cameras }) => {
  return (
    <Section>
      <h2 className='title'>{title}</h2>
      <ul className='columns'>
        {cameras.map(camera => <li key={camera} className='column'>
          <Image viewName={name} cameraName={camera} />
        </li>)}
      </ul>
    </Section>
  )
}

export default View
