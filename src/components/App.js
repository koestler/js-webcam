import React from 'react'
import { Button, Container, Notification, Section } from 'react-bulma-components'
import ConfiguredApp from './ConfiguredApp'
import { useConfig } from '../hooks/unauthApi'

const App = () => {
  const { config, success, error } = useConfig()
  if (success) {
    return <ConfiguredApp {...config} />
  } else if (error) {
    return <Error error={error} />
  } else {
    return <Loading />
  }
}

const Error = ({ error }) => {
  return (
    <Section>
      <Notification color='danger'>Cannot load configuration: {error}</Notification>
    </Section>
  )
}

const Loading = () => {
  return (
    <Section>
      <Notification color='info'>Loading initial configuration</Notification>
      <Container>
        <Button size='large' loading />
      </Container>
    </Section>
  )
}

export default App
