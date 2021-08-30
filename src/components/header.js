import React, { useState } from 'react'
import { Button, Heading, Navbar } from 'react-bulma-components'
import { Link } from 'react-router-dom'

const Header = (props) => {
  const [burgerActive, setBurgerActive] = useState(false)

  return (
    <Navbar color='primary' active={burgerActive}>
      <Navbar.Brand>
        <Navbar.Item renderAs='a' href='/'>
          <Heading>{props.title}</Heading>
        </Navbar.Item>
        <Navbar.Burger onClick={() => setBurgerActive(!burgerActive)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          {props.views.map(view =>
            <Navbar.Item key={view.name} to={`/${view.name}`} renderAs={Link}>
              {view.title}
            </Navbar.Item>
          )}
        </Navbar.Container>
        <Navbar.Container align='end'>
          <Navbar.Item renderAs={Link} to='/login'><Button>Log in</Button></Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

export default Header
