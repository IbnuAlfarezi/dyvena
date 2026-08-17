import { currentYear, META_DATA } from '@/config/constants'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col md={6} className="text-center text-md-start">
              {currentYear} © {META_DATA.name} - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">{META_DATA.author}</span>
            </Col>
            <Col md={6}>
              <div className="d-none d-md-flex justify-content-end gap-3">
                <Link href="" className="link-reset">
                  About
                </Link>
                <Link href="" className="link-reset">
                  Support
                </Link>
                <Link href="" className="link-reset">
                  Contact Us
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
