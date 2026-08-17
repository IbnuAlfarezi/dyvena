'use client'
import dynamic from 'next/dynamic'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { getWorldMapOptions } from './data'

const BaseVectorMap = dynamic(() => import('@/components/maps/BaseVectorMap'), { ssr: false })
const WorldMapMarkerLine = dynamic(() => import('./WorldMapMarkerLine'), { ssr: false })
const USAVectorMap = dynamic(() => import('./USAVectorMap'), { ssr: false })
const CanadaVectorMap = dynamic(() => import('./CanadaVectorMap'), { ssr: false })
const RussiaVectorMap = dynamic(() => import('./RussiaVectorMap'), { ssr: false })
const IraqVectorMap = dynamic(() => import('./IraqVectorMap'), { ssr: false })
const SpainVectorMap = dynamic(() => import('./SpainVectorMap'), { ssr: false })

const VectorMaps = () => {
  return (
    <>
      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">World Vector Map</h5>
            <p className="text-muted mb-0">A global map showing countries with interactive markers.</p>
          </CardHeader>
          <CardBody>
            <BaseVectorMap id="world-map" options={getWorldMapOptions()} style={{ height: 360 }} />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">World Vector Live Map</h5>
            <p className="text-muted mb-0">Live dynamic vector representation of the world with real-time features.</p>
          </CardHeader>
          <CardBody>
            <WorldMapMarkerLine />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">US Vector Map</h5>
            <p className="text-muted mb-0">Interactive vector map of the United States with state-level details.</p>
          </CardHeader>
          <CardBody>
            <USAVectorMap />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">Canada Vector Map</h5>
            <p className="text-muted mb-0">Displays Canadian provinces and territories with interactive regions.</p>
          </CardHeader>
          <CardBody>
            <CanadaVectorMap />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">Russia Vector Map</h5>
            <p className="text-muted mb-0">Interactive map highlighting major regions across Russia.</p>
          </CardHeader>
          <CardBody>
            <RussiaVectorMap />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">Iraq Vector Map</h5>
            <p className="text-muted mb-0">Vector visualization of Iraq highlighting provinces and regions.</p>
          </CardHeader>
          <CardBody>
            <IraqVectorMap />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader className="d-block">
            <h5 className="mb-1 card-title">Spain Vector Map</h5>
            <p className="text-muted mb-0">Geographical map of Spain with region-based interaction.</p>
          </CardHeader>
          <CardBody>
            <SpainVectorMap />
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default VectorMaps
