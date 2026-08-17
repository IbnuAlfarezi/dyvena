import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import MasonryBlogs from './components/MasonryBlogs'

export const metadata: Metadata = { title: 'Masonry' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Masonry" subtitle="Plugins" />
      <MasonryBlogs />
    </>
  )
}

export default Page
