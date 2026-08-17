import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import BlogGrid from './components/BlogGrid'

export const metadata: Metadata = { title: 'Blog Grid' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Blog" subtitle="Apps" />
      <BlogGrid />
    </>
  )
}

export default Page
