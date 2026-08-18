'use client'

import Icon from '@/components/wrappers/Icon'
import { authClient } from '@/lib/auth-client'
import { VerifyEmailFormValues, verifyEmailSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const VerifyEmailFormContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data: VerifyEmailFormValues) => {
    if (!email) {
      setError('Missing email address. Please start the sign up process again.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await authClient.emailOtp.verifyEmail({
        email,
        otp: data.otp,
      })

      if (res.error) {
        setError(res.error.message ?? 'Invalid verification code')
        return
      }

      // Verification successful, redirect to sign in or dashboard
      router.push('/auth/card/sign-in')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!email && (
        <Alert variant="warning" className="py-2 px-3 fs-14">
          Email address not found in URL.
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="py-2 px-3 fs-14">
          {error}
        </Alert>
      )}

      <div className="mb-3">
        <FormLabel>
          Verification Code
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl
            type="text"
            id="otp"
            placeholder="123456"
            maxLength={6}
            isInvalid={!!errors.otp}
            disabled={loading || !email}
            {...register('otp')}
          />
          <Icon icon="key" className="app-search-icon text-muted" />
          <Form.Control.Feedback type="invalid">{errors.otp?.message}</Form.Control.Feedback>
        </div>
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading || !email}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Verifying...
            </>
          ) : (
            'Verify Email'
          )}
        </Button>
      </div>
    </Form>
  )
}

const VerifyEmailForm = () => {
  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <VerifyEmailFormContent />
    </Suspense>
  )
}

export default VerifyEmailForm
