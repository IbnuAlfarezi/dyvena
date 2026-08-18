'use client'

import Icon from '@/components/wrappers/Icon'
import { authClient } from '@/lib/auth-client'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Turnstile } from '@marsidev/react-turnstile'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, InputGroup, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const ResetForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setLoading(true)
      setError(null)

      // Request an OTP for password reset
      const res = await authClient.emailOtp.requestPasswordReset({
        email: data.email,
        fetchOptions: {
          headers: turnstileToken ? { 'x-turnstile-token': turnstileToken } : undefined
        }
      })

      if (res.error) {
        // Prevent User Enumeration: if user is not found, pretend it succeeded
        const isNotFound = res.error.status === 404 || res.error.message?.toLowerCase().includes('not found')
        if (isNotFound) {
          router.push(`/auth/card/new-pass?email=${encodeURIComponent(data.email)}`)
          return
        }
        setError(res.error.message ?? 'Failed to send reset request')
        return
      }

      router.push(`/auth/card/new-pass?email=${encodeURIComponent(data.email)}`)
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

      <div className="mb-3 d-flex justify-content-center">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          onSuccess={(token) => setTurnstileToken(token)}
          options={{ theme: 'light' }}
        />
      </div>

      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Sending...
            </>
          ) : (
            'Send Request'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default ResetForm
