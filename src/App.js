import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Button, Container, Heading, Notification, Section } from 'react-bulma-components'
import { Helmet } from 'react-helmet'
import Header from './components/header'
import View from './components/view'
import Footer from './components/footer'
import Login from './components/login'

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

const ConfiguredApp = ({ projectTitle, views }) => {
  return (
    <BrowserRouter>
      <Helmet>
        <title>{projectTitle}</title>
      </Helmet>
      <Header title={projectTitle} views={views} />
      <Switch>
        {views.map(view =>
          <Route key={view.name} path={`/${view.name}`}>
            <View {...view} />
          </Route>
        )}
        <Route path='/login'>
          <Login />
        </Route>
        <DefaultRoute default views={views} />
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
