'use client'

import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import Icon from '@/components/wrappers/Icon'
import { authClient } from '@/lib/auth-client'
import { ResetPasswordFormValues, resetPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'

const NewPassFormContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!email) {
      setError('Invalid or missing email address.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await authClient.emailOtp.resetPassword({ email, otp: data.otp, password: data.password })

      if (res.error) {
        setError(res.error.message ?? 'Failed to reset password')
        return
      }

      router.push('/auth/card/sign-in')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="danger" className="py-2 px-3 fs-14">
          {error}
        </Alert>
      )}

      {!email && (
        <Alert variant="warning" className="py-2 px-3 fs-14">
          Missing email in URL. Please start the password reset process again.
        </Alert>
      )}

      <div className="mb-3">
        <FormLabel>
          Reset Code (OTP)
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="text"
            id="otp"
            placeholder="123456"
            maxLength={6}
            isInvalid={!!errors.otp}
            disabled={loading}
            {...register('otp')}
          />
          <Icon icon="key" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.otp?.message}</Form.Control.Feedback>
        </div>
      </div>

      <div className="mb-3" data-password="bar">
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <PasswordInputWithStrength
              id="userPassword"
              label="New Password"
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
          Confirm New Password&nbsp;
          <span className="text-danger">*</span>
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

      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading || !email}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </Button>
      </div>
    </Form>
  )
}

const NewPassForm = () => {
  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <NewPassFormContent />
    </Suspense>
  )
}

export default NewPassForm
