import React from 'react';
import {Button, Box, Form} from "react-bulma-components";

const Login = () => {
  return <Box style={{width: 400, margin: 'auto'}}>
    <form>
      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.Control>
          <Form.Input              type="text"          />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input type="password" placeholder="*************"/>
        </Form.Control>
      </Form.Field>
      <Button.Group align="right">
        <Button color="primary">Log in</Button>
      </Button.Group>
    </form>
  </Box>
}

export default Login;