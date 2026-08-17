'use client'
import dynamic from 'next/dynamic'
import { Col } from 'react-bootstrap'

const VerticalScroll = dynamic(() => import('./VerticalScroll'), { ssr: false })
const HorizontalScroll = dynamic(() => import('./HorizontalScroll'), { ssr: false })

const Table = () => {
  return (
    <>
      <Col xs={12}>
        <VerticalScroll />
        <HorizontalScroll />
      </Col>
    </>
  )
}

export default Table
