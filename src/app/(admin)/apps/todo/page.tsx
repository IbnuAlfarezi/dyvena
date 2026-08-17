import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import Todos from './components/Todos'

export const metadata: Metadata = { title: 'Todo' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Todo" subtitle="Apps" />
      <Todos />
    </>
  )
}

export default Page
