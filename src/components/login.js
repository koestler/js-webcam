import React, { useState } from 'react'
import { Button, Box, Form, Section, Heading, Notification } from 'react-bulma-components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../auth'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const { login, isLoggedIn } = useAuth()

  const onSubmit = async data => {
    setSuccess(false)
    setError(false)
    const error = await login(data.user, data.password)
    if (error === null) {
      setSuccess(true)
    } else {
      setError(error)
    }
  }

  return (
    <Section>
      <Heading renderAs='h2'>Log in</Heading>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        {success && isLoggedIn() && <Notification color='success'>You have been logged in.</Notification>}
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
              type='password' placeholder='*********'
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
