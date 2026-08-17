'use client'

import Icon from '@/components/wrappers/Icon'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, CardBody, CardTitle, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { IntegrationType } from '../data'

const IntegrationCard = ({ integration }: { integration: IntegrationType }) => {
  const { name, description, image, isFree, website } = integration
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="avatar-xl d-block mb-1">
            <span className="avatar-title bg-light bg-opacity-75 rounded">
              <Image src={image} alt={name} height={30} />
            </span>
          </span>
          <span className={clsx('badge badge-label', isFree ? 'text-bg-light' : 'text-bg-warning')}>
            {!isFree && <Icon icon="medal" />} {isFree ? 'Free' : 'Premium'}
          </span>
        </div>
        <CardTitle as="h4" className="mb-1">
          {name}
        </CardTitle>
        <p className="card-text text-muted">{description}</p>
        <div className="mb-3 d-flex align-items-center gap-1">
          <Icon icon="world" />
          <Link href="" className="link-reset">
            {website}
          </Link>
        </div>
        <div className="d-flex gap-2">
          <Button variant="success" className="w-50">
            Connect
          </Button>
          <OverlayTrigger overlay={<Tooltip>View integration details</Tooltip>}>
            <button className="btn btn-outline-secondary w-50">
              Learn More
              <Icon icon="arrow-right" className="ms-1" />
            </button>
          </OverlayTrigger>
        </div>
      </CardBody>
    </Card>
  )
}

export default IntegrationCard
