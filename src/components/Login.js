import React, { useEffect } from 'react'
import { Button, Box, Form, Section, Heading, Notification } from 'react-bulma-components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/auth'
import { useLogin } from '../hooks/unauthApi'

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { logout, isLoggedIn, getUser } = useAuth()
  const { login, success, error } = useLogin()

  const onSubmit = async data => {
    logout()
    login(data.user, data.password)
  }

  useEffect(() => {
    if (success) reset()
  }, [success, reset])

  return (
    <Section>
      <Heading renderAs='h2'>Log in</Heading>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        {success && isLoggedIn() && <Notification color='success'>You have been logged in as {getUser()}.</Notification>}
        {!success && isLoggedIn() && <Notification color='info'>You are logged in as {getUser()}.</Notification>}
        {error && !isLoggedIn() && <Notification color='danger'>Login failed: {error}</Notification>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <Form.Label>User</Form.Label>
            <input
              type='text'
              className={'input is-primary' + (errors.user ? ' is-danger' : '')}
              {...register('user', { required: true, minLength: 2 })}
            />
          </Form.Field>
          <Form.Field>
            <Form.Label>Password</Form.Label>
            <input
              type='password'
              className={'input is-primary' + (errors.password ? ' is-danger' : '')}
              {...register('password', { required: true, minLength: 4 })}
            />
          </Form.Field>
          <Button.Group align='right'>
            <Button color='primary'>Log in</Button>
          </Button.Group>
        </form>
      </Box>
    </Section>
  )
}

export default Login
