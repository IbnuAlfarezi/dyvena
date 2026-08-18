'use client'

import Icon from '@/components/wrappers/Icon'
import { authClient } from '@/lib/auth-client'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, InputGroup, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const ResetForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

      // @ts-expect-error Better Auth forgetPassword is valid at runtime but TS doesn't infer it without inferServerPlugin
      const res = await authClient.forgetPassword({
        email: data.email,
        redirectTo: '/auth/card/new-pass',
      })

      if (res.error) {
        setError(res.error.message ?? 'Failed to send reset request')
        return
      }

      router.push('/auth/card/success-mail')
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
          <InputGroup>
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
          </InputGroup>
        </div>
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
