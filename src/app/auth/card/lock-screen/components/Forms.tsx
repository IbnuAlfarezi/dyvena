'use client'

import Icon from '@/components/wrappers/Icon'
import { useLockScreen } from '@/hooks/useLockScreen'
import { LockScreenFormValues, lockScreenSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { Alert, Button, Form, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import user1 from '@/assets/images/users/user-1.jpg'

const Forms = () => {
  const { unlock, user } = useLockScreen()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LockScreenFormValues>({
    resolver: zodResolver(lockScreenSchema),
    defaultValues: { password: '' },
  })

  const onSubmit = async (data: LockScreenFormValues) => {
    try {
      setLoading(true)
      setError(null)

      const res = await unlock(data.password)

      if (res?.error) {
        setError(res.error)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-4">
        <Image src={user?.image || user1} width={80} height={80} className="rounded-circle img-thumbnail mb-2" alt="thumbnail" style={{ objectFit: 'cover' }} />
        <h5 className="fs-md">{user?.name || user?.email || 'Loading...'}</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="danger" className="py-2 px-3 fs-14">
            {error}
          </Alert>
        )}

        <div className="mb-3">
          <FormLabel>
            Password&nbsp;
            <span className="text-danger">*</span>
          </FormLabel>
          <div className="app-search">
            <Icon icon="lock-password" className="app-search-icon text-muted" />
            <FormControl
              type="password"
              placeholder="••••••••"
              isInvalid={!!errors.password}
              disabled={loading}
              {...register('password')}
            />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </div>
        </div>
        <div className="d-grid">
          <Button variant="primary" type="submit" className="fw-semibold py-2" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Unlocking...
              </>
            ) : (
              'Unlock'
            )}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Forms
