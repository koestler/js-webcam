import React, {useState} from 'react';
import {Button, Navbar} from "react-bulma-components";
import {Link} from "react-router-dom";

const Header = (props) => {
	const [burgerActive, setBurgerActive] = useState(false)

	return <Navbar color="primary" active={burgerActive}>
    <Navbar.Brand>
      <Navbar.Item renderAs="a" href="/">
		  <h1 className="title">{props.title}</h1>
      </Navbar.Item>
      <Navbar.Burger onClick={() => setBurgerActive(!burgerActive)} />
    </Navbar.Brand>
    <Navbar.Menu>
      <Navbar.Container>
		  { props.views.map(view =>
			  <Navbar.Item key={view.name} href={`/${view.name}`}>
				  <Navbar.Link>{view.title}</Navbar.Link>
			  </Navbar.Item>
		  )}
      </Navbar.Container>
      <Navbar.Container align="end">
        <Navbar.Item renderAs={Link} href="/login"><Button>Log in</Button></Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  </Navbar>
}

export default Header;
