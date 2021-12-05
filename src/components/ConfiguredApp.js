import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './Header'
import View from './View'
import Login from './Login'
import Footer from './Footer'
import { Heading, Notification, Section } from 'react-bulma-components'
import { useAuth } from '../hooks/auth'

const ConfiguredApp = ({ projectTitle, views }) => {
  const { isViewVisible } = useAuth()
  const myViews = views.filter(isViewVisible)
  return (
    <BrowserRouter>
      <Helmet>
        <title>{projectTitle}</title>
      </Helmet>
      <Header title={projectTitle} views={myViews} />
      <Switch>
        {myViews.map(view =>
          <Route key={view.name} path={`/${view.name}`}>
            <View {...view} />
          </Route>
        )}
        <Route path='/login'>
          <Login />
        </Route>
        <DefaultRoute default views={myViews} />
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

export default ConfiguredApp
