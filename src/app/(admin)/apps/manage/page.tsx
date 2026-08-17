import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { type Metadata } from 'next'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'
import AuthorizedAppCard from './components/AuthorizedAppCard'
import IntegrationCard from './components/IntegrationCard'
import { authorizedAppData, integrationData } from './data'

export const metadata: Metadata = { title: 'Manage Apps' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Manage Apps" subtitle="Apps" />

      <Row>
        <Col xs={12}>
          <h5 className="mb-1 fs-lg">Authorized Apps</h5>
          <p className="text-muted">
            You’re currently using&nbsp;
            <strong>3 of 3</strong>&nbsp; free integrations. Upgrade to&nbsp;
            <Link href="" className="text-decoration-underline">
              PRO
            </Link>
            &nbsp; to unlock more integrations and supercharge your workflow.
          </p>
        </Col>
      </Row>
      <Row>
        {authorizedAppData.map((app, idx) => (
          <Col md={4} key={idx}>
            <AuthorizedAppCard app={app} />
          </Col>
        ))}
      </Row>
      <Row className="my-2">
        <Col xs={12} className="text-center">
          <h5 className="mb-1 fs-lg">Explore More Integrations</h5>
          <p className="text-muted mb-3">Discover over 200 integrations to enhance your workflow</p>
        </Col>
      </Row>
      <Row>
        {integrationData.map((item, idx) => (
          <Col md={4} key={idx}>
            <IntegrationCard integration={item} />
          </Col>
        ))}
        <Col xs={12} className="mb-3">
          <nav>
            <ul className="pagination pagination-boxed pagination-rounded justify-content-center">
              <li className="page-item">
                <Link className="page-link" href="" aria-label="Previous">
                  <Icon icon="chevron-left" className="align-middle fs-lg" />
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" href="">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  4
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="">
                  5
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="" aria-label="Next">
                  <Icon icon="chevron-right" className="align-middle fs-lg" />
                </Link>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </>
  )
}

export default Page
