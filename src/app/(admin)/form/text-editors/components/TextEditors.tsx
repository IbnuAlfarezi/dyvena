'use client'
import dynamic from 'next/dynamic'
import { Col } from 'react-bootstrap'

const SnowEditor = dynamic(() => import('./SnowEditor'), { ssr: false })

const TextEditors = () => {
  return (
    <>
      <Col xs={12}>
        <SnowEditor />
      </Col>
    </>
  )
}

export default TextEditors
