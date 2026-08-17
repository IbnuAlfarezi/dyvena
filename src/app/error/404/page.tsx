import AuthImage from '@/assets/images/auth-card-bg.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Col, Container, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: '404 Error' }

const Page = () => {
  return (
    <>
      <div className="position-absolute top-0 end-0">
        <Image src={AuthImage} className="auth-card-bg-img" alt="auth-card-bg" />
      </div>
      <div className="position-absolute bottom-0 start-0" style={{ transform: 'rotate(180deg)' }}>
        <Image src={AuthImage} className="auth-card-bg-img" alt="auth-card-bg" />
      </div>

      <div className="auth-box overflow-hidden align-items-center d-flex">
        <Container>
          <Row className="justify-content-center">
            <Col xxl={5} md={6} sm={8}>
              <Card className="p-4">
                <div className="auth-brand text-center mb-2">
                  <AuthLogo />
                </div>
                <div className="p-4 text-center">
                  <div className="error-text-alt fs-72 text-warning">404</div>
                  <h3 className="fw-bold text-uppercase">Nothing Here</h3>
                  <p className="text-muted fs-5">We couldn’t find the page you were looking for. It might have been moved or deleted.</p>
                  <div className="mt-4 d-flex justify-content-center gap-1">
                    <Link className="btn btn-primary" href="/">
                      Back to Home
                    </Link>
                    <button className="btn btn-outline-info">Search</button>
                  </div>
                </div>
              </Card>
              <p className="text-center text-muted mt-4 mb-0">
                © {currentYear} {META_DATA.name} — by <span className="fw-semibold">{META_DATA.author}</span>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Page
