import React, { useState } from 'react'
import { Button, Navbar } from 'react-bulma-components'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth'

const Header = (props) => {
  const [burgerActive, setBurgerActive] = useState(false)
  const { isLoggedIn, getUser, logout } = useAuth()

  return (
    <Navbar color='primary' active={burgerActive}>
      <Navbar.Brand>
        <Navbar.Item renderAs='a' href='/'>
          <p>{props.title}</p>
        </Navbar.Item>
        <Navbar.Burger onClick={() => setBurgerActive(!burgerActive)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          {props.views.map(view =>
            <Navbar.Item key={view.name} to={`/${view.name}`} activeClassName='is-active' renderAs={NavLink}>
              {view.title}
            </Navbar.Item>
          )}
        </Navbar.Container>
        <Navbar.Container align='end'>
          {isLoggedIn() || (
            <Navbar.Item renderAs={Link} to='/login'>
              <Button>Log in</Button>
            </Navbar.Item>
          )}
          {isLoggedIn() && (
            <Navbar.Item>
              <Button onClick={logout}>Log out {getUser()}</Button>
            </Navbar.Item>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

export default Header
