import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Button, Container, Heading, Notification, Section } from 'react-bulma-components'
import Header from './components/header'
import View from './components/view'
import Footer from './components/footer'
import Login from './components/login'
import { Helmet } from 'react-helmet'

const App = () => {
  const [config, setConfig] = useState(null)
  useEffect(() => {
    window.fetch('/api/v0/config')
      .then(res => res.json())
      .then(data => setConfig(data))
  }, [])

  if (config === null) {
    return (
      <Container>
        <Button size='large' loading />
      </Container>
    )
  }

  return (
    <BrowserRouter>
      <Helmet>
        <title>{config.projectTitle}</title>
      </Helmet>
      <Header title={config.projectTitle} views={config.views} />
      <Switch>
        {config.views.map(view =>
          <Route key={view.name} path={`/${view.name}`}>
            <View {...view} />
          </Route>
        )}
        <Route path='/login'>
          <Login />
        </Route>
        <DefaultRoute default views={config.views} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

const DefaultRoute = ({ views }) => {
  if (views.length < 1) {
    return (
      <Section>
        <Heading>Empty</Heading>
        <Notification>
          No views are defined. Check your config.yaml
        </Notification>
      </Section>
    )
  }

  const defaultView = views[0]
  return <Redirect to={`/${defaultView.name}`} />
}

export default App
