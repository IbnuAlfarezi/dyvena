import Icon from '@/components/wrappers/Icon'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { topCountryData } from './data'

const TopCountries = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between align-items-center">
          <CardTitle as="h4">Top Countries</CardTitle>
        </CardHeader>
        <CardBody>
          {topCountryData.map((item, idx) => (
            <div className="d-flex align-items-center gap-2 mb-3" key={idx}>
              <Image src={item.image} alt={item.name} className="avatar-xxs rounded" />
              <h5 className="mb-0 fw-medium">
                <Link href="" className="link-reset">
                  {item.name}
                </Link>
                <small className="text-muted ms-1">Pop: {item.population}</small>
              </h5>
              <div className="ms-auto">
                <div className="d-flex align-items-center gap-3 text-end">
                  <p className="mb-0 fw-medium">{item.visitors}</p>
                  <p className={clsx('badge badge-label fs-xxs mb-0', item.change < 0 ? 'badge-soft-danger' : 'badge-soft-success')}>
                    {item.change > 0 ? '+' : ''}
                    {item.change}%
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <Link href="" className="link-reset text-decoration-underline fw-semibold link-offset-3">
              View all Countries <Icon icon="world" />
            </Link>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default TopCountries
