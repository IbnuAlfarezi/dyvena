'use client'
import dynamic from 'next/dynamic'
import { Col } from 'react-bootstrap'

const CellSelection = dynamic(() => import('./CellSelection'), { ssr: false })
const MultiItemSelection = dynamic(() => import('./MultiItemSelection'), { ssr: false })
const SingleItemSelect = dynamic(() => import('./SingleItemSelect'), { ssr: false })

const Table = () => {
  return (
    <>
      <Col xs={12}>
        <SingleItemSelect />
        <MultiItemSelection />
        <CellSelection />
      </Col>
    </>
  )
}

export default Table
