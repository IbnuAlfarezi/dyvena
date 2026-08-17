'use client'

import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { trafficSourceData } from './data'

const TopTraffic = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as="h4">
            Top Traffic Sources
            <OverlayTrigger placement="top" overlay={<Tooltip id="info-tooltip">Shows which channels drive the most traffic.</Tooltip>}>
              <span className="ms-1">
                <Icon icon="info-circle" className="text-muted" />
              </span>
            </OverlayTrigger>
          </CardTitle>
          <Dropdown className="ms-auto">
            <DropdownToggle className="btn btn-sm btn-default btn-icon content-none">
              <Icon icon="dots-vertical" className="fs-lg" />
            </DropdownToggle>
            <DropdownMenu align="end">
              <DropdownItem>
                <Icon icon="chart-bar" className="me-2" /> View Detailed Report
              </DropdownItem>
              <DropdownItem>
                <Icon icon="download" className="me-2" /> Export Traffic Data
              </DropdownItem>
              <DropdownItem>
                <Icon icon="filter-2" className="me-2" /> Filter by Source
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="text-danger">
                <Icon icon="trash" className="me-2" /> Remove Widget
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              {trafficSourceData.slice(0, 5).map((item, idx, arr) => (
                <div className={`custom-progress ${idx !== arr.length - 1 ? 'mb-3' : ''}`} key={idx}>
                  <div className="progress-info d-flex justify-content-between align-items-center">
                    <div>
                      <Image src={item.image} alt="user-image" className="me-1" height={item.height} />
                      <span className="align-middle fw-semibold fs-md">&nbsp;{item.name}</span>
                    </div>
                    <span className="fw-semibold text-muted float-end">{item.value}k</span>
                  </div>
                  <div className={`progress-data bg-${item.variant}`} style={{ width: `${item.progress}%` }} />
                </div>
              ))}
            </Col>
            <Col>
              {trafficSourceData.slice(5, 10).map((item, idx, arr) => (
                <div className={`custom-progress ${idx !== arr.length - 1 ? 'mb-3' : ''}`} key={idx}>
                  <div className="progress-info d-flex justify-content-between align-items-center">
                    <div>
                      <Image src={item.image} alt="user-image" className="me-1" height={item.height} />
                      &nbsp;<span className="align-middle fw-semibold fs-md">{item.name}</span>
                    </div>
                    <span className="fw-semibold text-muted float-end">{item.value}K</span>
                  </div>
                  <div className={`progress-data bg-${item.variant}`} style={{ width: `${item.progress}%` }} />
                </div>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default TopTraffic
