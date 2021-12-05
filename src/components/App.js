import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bulma-components'
import ConfiguredApp from './ConfiguredApp'

const App = () => {
  const [config, setConfig] = useState(null)
  useEffect(() => {
    window.fetch('/api/v0/config')
      .then(res => res.json())
      .then(data => setConfig(data))
  }, [])

  if (config === null) {
    return <Loading />
  }
  return <ConfiguredApp {...config} />
}

const Loading = () => {
  return (
    <Container>
      <Button size='large' loading />
    </Container>
  )
}

export default App
