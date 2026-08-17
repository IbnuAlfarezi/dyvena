'use client'
import dynamic from 'next/dynamic'
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'

const ColumnTable = dynamic(() => import('./ColumnTable'), { ssr: false })

const Table = () => {
  return (
    <>
      <Card>
        <CardHeader className="justify-content-between">
          <CardTitle as={'h4'}>Example</CardTitle>
        </CardHeader>
        <CardBody>
          <ColumnTable />
        </CardBody>
      </Card>
    </>
  )
}

export default Table
