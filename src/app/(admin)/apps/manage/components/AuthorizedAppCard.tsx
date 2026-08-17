'use client'

import Image from 'next/image'
import { Button, Card, CardBody, CardTitle, Col, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import { AppType } from '../data'

const AuthorizedAppCard = ({ app }: { app: AppType }) => {
  const { name, description, image, usagePercent, plan, syncTime, account, isActive, status, lastSync } = app
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <Image src={image} alt={`${name} Logo`} width={48} height={48} className="rounded" />
            <div>
              <CardTitle as="h4" className="mb-1">
                {name}
              </CardTitle>
              <p className="text-muted mb-0">{description}</p>
            </div>
          </div>

          <div className="form-check form-switch">
            <FormCheckInput className="form-check-input" type="checkbox" defaultChecked={isActive} readOnly />
          </div>
        </div>

        <div className="mb-3 d-flex flex-wrap gap-2">
          <span className="badge bg-light text-primary px-2 py-1 rounded-pill">{plan}</span>
          <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill">{status}</span>
          <span className="badge bg-info-subtle text-info px-2 py-1 rounded-pill">Sync: {syncTime}</span>
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <p className="fs-xxs text-uppercase fw-bold mb-0 text-muted">Connected Account</p>
            <span>{account}</span>
          </Col>
          <Col md={6}>
            <p className="fs-xxs text-uppercase fw-bold mb-0 text-muted">Last Sync</p>
            <span>{lastSync}</span>
          </Col>
        </Row>

        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span className="mb-2 fw-bold fs-xs">Usage</span>
            <small className="fw-bold text-success">{usagePercent}% of quota</small>
          </div>
          <ProgressBar variant="success" now={usagePercent} style={{ height: 6 }} />
        </div>

        <div className="d-flex gap-2">
          <Button variant="outline-danger" className="w-50">
            Remove
          </Button>
          <OverlayTrigger overlay={<Tooltip>View integration details</Tooltip>}>
            <Button variant="outline-primary" className="w-50">
              Details
            </Button>
          </OverlayTrigger>
        </div>
      </CardBody>
    </Card>
  )
}

export default AuthorizedAppCard
