import authcard from '@/assets/images/auth-card-bg.svg'
import auth from '@/assets/images/auth.jpg'
import user1 from '@/assets/images/users/user-1.jpg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import Forms from './components/Forms'

export const metadata: Metadata = { title: 'Lock Screen' }

const Page = () => {
  return (
    <>
      <div className="position-absolute top-0 end-0">
        <Image src={authcard} className="auth-card-bg-img" alt="auth-card-bg" />
      </div>
      <div className="position-absolute bottom-0 start-0" style={{ transform: 'rotate(180deg)' }}>
        <Image src={authcard} className="auth-card-bg-img" alt="auth-card-bg" />
      </div>
      <div className="auth-box d-flex align-items-center">
        <Container fluid="xxl">
          <Row className="align-items-center justify-content-center">
            <Col xl={10}>
              <Card>
                <Row className="justify-content-between g-0">
                  <Col lg={6}>
                    <CardBody>
                      <div className="auth-brand text-center mb-4 position-relative">
                        <AuthLogo />
                        <h4 className="fw-bold mt-4">Lock Screen!</h4>
                        <p className="text-muted w-lg-75 mx-auto">This screen is locked. Enter your password to continue.</p>
                      </div>
                      <Forms />
                      <p className="text-muted text-center mt-4 mb-0">
                        Not you? Return to&nbsp;
                        <Link href="/auth/card/sign-in" className="text-decoration-underline link-offset-3 fw-semibold">
                          Sign in
                        </Link>
                      </p>
                      <p className="text-center text-muted mt-4 mb-0">
                        © {currentYear} {META_DATA.name} — by <span className="fw-bold">{META_DATA.author}</span>
                      </p>
                    </CardBody>
                  </Col>
                  <Col lg={6} className="d-none d-lg-block">
                    <div className="h-100 position-relative card-side-img rounded-end overflow-hidden" style={{ backgroundImage: `url(${auth.src})` }}>
                      <div className="p-4 card-img-overlay rounded-end auth-overlay d-flex align-items-end justify-content-center" />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Page
