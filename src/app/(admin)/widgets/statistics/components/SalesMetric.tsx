import Icon from '@/components/wrappers/Icon'
import { Card, CardBody, Col } from 'react-bootstrap'
import { dealStatData } from './data'

const SalesMetric = () => {
  return (
    <>
      {dealStatData.map((item, idx) => (
        <Col key={idx} className={idx === dealStatData.length - 1 ? 'col-lg col-md-auto' : ''}>
          <Card>
            <CardBody>
              <div className="d-flex gap-3">
                <div className="avatar-lg rounded-circle text-bg-light d-flex align-items-center justify-content-center">
                  <Icon icon={item.icon} className="fs-xxl" />
                </div>
                <div className="flex-grow-1">
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="fs-xl mb-0">
                      {item.prefix}
                      {item.value}
                      <small className="fs-6 ms-1">{item.suffix}</small>
                    </h5>
                    <span>
                      {Math.abs(item.change)}%{item.change >= 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
                    </span>
                  </div>
                  <p className="text-muted mb-2">{item.title}</p>
                  <div className={`progress progress-sm bg-${item.variant} bg-opacity-25 mb-0`}>
                    <div className={`progress-bar bg-${item.variant}`} role="progressbar" style={{ width: `${item.progress}%` }} aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default SalesMetric
