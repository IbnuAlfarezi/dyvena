import AuthImage from '@/assets/images/auth-card-bg.svg'
import maintenanceImg from '@/assets/images/maintenance.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Maintenance' }

const Page = () => {
  return (
    <>
      <div className="position-absolute top-0 end-0">
        <Image src={AuthImage} className="auth-card-bg-img" alt="auth-card-bg" />
      </div>
      <div className="position-absolute bottom-0 start-0" style={{ transform: 'rotate(180deg)' }}>
        <Image src={AuthImage} className="auth-card-bg-img" alt="auth-card-bg" />
      </div>
      <div className="auth-box d-flex align-items-center">
        <Container fluid="xxl">
          <Row className="align-items-center justify-content-center">
            <Col xl={6}>
              <Card className="mb-0">
                <CardBody>
                  <div className="auth-brand text-center mb-0">
                    <AuthLogo />
                  </div>
                  <div className="p-2 text-center">
                    <div className="w-md-50 mx-auto">
                      <Image src={maintenanceImg} alt="Maintenance" className="img-fluid" />
                    </div>
                    <h3 className="fw-bold text-uppercase">We’ll Be Back Soon</h3>
                    <p className="text-muted">
                      Our site is undergoing routine maintenance to improve your experience.
                      <br />
                      Thank you for your patience.
                    </p>
                    <Button variant="primary" className="mt-3 me-1">
                      Call Support
                    </Button>
                    &nbsp;
                    <Button variant="info" className="mt-3">
                      Send Email
                    </Button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">
                    © {currentYear} {META_DATA.name} — by <span className="fw-semibold">{META_DATA.author}</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Page
