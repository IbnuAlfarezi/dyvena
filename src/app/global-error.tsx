'use client'

import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Send the error to our custom logging endpoint
    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        url: typeof window !== 'undefined' ? window.location.href : '',
      }),
    }).catch(console.error); // Silently catch if the logging endpoint fails
  }, [error]);

  return (
    <html>
      <body>
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
          <h2 className="mb-4">Something went wrong!</h2>
          <p className="text-muted mb-4">A critical error occurred while rendering this page. The developers have been notified.</p>
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
        </Container>
      </body>
    </html>
  )
}
