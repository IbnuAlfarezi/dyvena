import authcard from '@/assets/images/auth-card-bg.svg'
import auth from '@/assets/images/auth.jpg'
import deleteIcon from '@/assets/images/delete.png'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Delete Account' }

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
                      </div>
                      <div className="mb-4">
                        <div className="avatar-xxl mx-auto mt-2">
                          <div className="avatar-title bg-light-subtle border border-light border-dashed rounded-circle">
                            <Image src={deleteIcon} alt="dark logo" height={64} />
                          </div>
                        </div>
                      </div>
                      <h4 className="fw-bold text-center mb-3">Account Deactivated</h4>
                      <p className="text-muted text-center mb-4">Your account is currently inactive. Reactivate now to regain access to all features and opportunities.</p>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" className="fw-semibold py-2">
                          Reactivate Now
                        </Button>
                      </div>
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
