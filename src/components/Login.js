import React, { useState } from 'react'
import { Button, Box, Form, Section, Heading, Notification } from 'react-bulma-components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/auth'

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const { login, logout, isLoggedIn, getUser } = useAuth()

  const onSubmit = async data => {
    setSuccess(false)
    setError(false)
    logout()
    const error = await login(data.user, data.password)
    if (error === null) {
      setSuccess(true)
      reset()
    } else {
      setError(error)
    }
  }

  return (
    <Section>
      <Heading renderAs='h2'>Log in</Heading>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        {success && isLoggedIn() && <Notification color='success'>You have been logged in as {getUser()}.</Notification>}
        {!success && isLoggedIn() && <Notification color='info'>You are logged in as {getUser()}.</Notification>}
        {error && !isLoggedIn() && <Notification color='danger'>{error}</Notification>}

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
