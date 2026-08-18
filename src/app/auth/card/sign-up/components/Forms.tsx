'use client'

import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { useAuth } from '@/hooks/useAuth'
import { SignUpFormValues, signUpSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import { Alert, Button, Form, FormCheck, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'

const Forms = () => {
  const { register: registerAuth, loading, error } = useAuth()
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    await registerAuth(data.name, data.email, data.password, turnstileToken)
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
          Name
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="text"
            id="userName"
            placeholder={META_DATA.username}
            isInvalid={!!errors.name}
            disabled={loading}
            {...register('name')}
          />
          <Icon icon="user" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
        </div>
      </div>

      <div className="mb-3">
        <FormLabel>
          Email address
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="email"
            id="userEmail"
            placeholder="you@example.com"
            isInvalid={!!errors.email}
            disabled={loading}
            {...register('email')}
          />
          <Icon icon="mail" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </div>
      </div>

      <div className="mb-3" data-password="bar">
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <PasswordInputWithStrength
              id="userPassword"
              label="Password"
              name="user-password"
              password={value}
              setPassword={onChange}
              placeholder="••••••••"
              showIcon={true}
              inputClassName={errors.password ? 'is-invalid' : ''}
            />
          )}
        />
        {errors.password && <div className="text-danger fs-14 mt-1">{errors.password.message}</div>}
      </div>

      <div className="mb-3">
        <FormLabel>
          Confirm Password
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            isInvalid={!!errors.confirmPassword}
            disabled={loading}
            {...register('confirmPassword')}
          />
          <Icon icon="lock-password" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
        </div>
      </div>

      <div className="mb-3">
        <FormCheck>
          <FormCheck.Input
            className="form-check-input-light fs-14"
            type="checkbox"
            id="termAndPolicy"
            isInvalid={!!errors.termsAccepted}
            disabled={loading}
            {...register('termsAccepted')}
          />
          <FormCheck.Label htmlFor="termAndPolicy">Agree the Terms &amp; Policy</FormCheck.Label>
          {errors.termsAccepted && <div className="text-danger fs-14 mt-1">{errors.termsAccepted.message}</div>}
        </FormCheck>
      </div>

      <div className="mb-3 d-flex justify-content-center">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onSuccess={(token) => setTurnstileToken(token)}
          options={{ theme: 'light' }}
        />
      </div>

      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Creating account…
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default Forms
