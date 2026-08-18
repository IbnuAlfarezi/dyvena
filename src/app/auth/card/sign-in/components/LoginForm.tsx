'use client'

import Icon from '@/components/wrappers/Icon'
import { useAuth } from '@/hooks/useAuth'
import { SignInFormValues, signInSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Alert, Button, Form, FormCheck, FormControl, FormLabel, InputGroup, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const { login, loading, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: SignInFormValues) => {
    await login(data.email, data.password)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="danger" className="py-2 px-3 fs-14">
          {error}
        </Alert>
      )}

      <div className="mb-3">
        <FormLabel>
          Email address
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="email"
            id="loginEmail"
            placeholder="you@example.com"
            isInvalid={!!errors.email}
            disabled={loading}
            {...register('email')}
          />
          <Icon icon="mail" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </div>
      </div>

      <div className="mb-3">
        <FormLabel>
          Password
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="password"
            id="loginPassword"
            placeholder="••••••••"
            isInvalid={!!errors.password}
            disabled={loading}
            {...register('password')}
          />
          <Icon icon="lock-password" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormCheck>
          <Form.Check.Input className="form-check-input form-check-input-light fs-14" type="checkbox" id="rememberMe" {...register('rememberMe')} />
          <Form.Check.Label className="form-check-label" htmlFor="rememberMe">
            Keep me signed in
          </Form.Check.Label>
        </FormCheck>
        <Link href="/auth/card/reset-pass" className="text-decoration-underline link-offset-3 text-muted">
          Forgot Password?
        </Link>
      </div>

      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Signing in…
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
