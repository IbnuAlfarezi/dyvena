'use client'
import dynamic from 'next/dynamic'

const ExportDataWithButtons = dynamic(() => import('./ExportDataWithButtons'), { ssr: false })
const ExportDataWithDropdown = dynamic(() => import('./ExportDataWithDropdown'), { ssr: false })

const Table = () => {
  return (
    <>
      <ExportDataWithButtons />
      <ExportDataWithDropdown />
    </>
  )
}

export default Table
