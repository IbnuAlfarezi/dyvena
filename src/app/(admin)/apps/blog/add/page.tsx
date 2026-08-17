import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import CreateArticle from './components/CreateArticle'

export const metadata: Metadata = { title: 'Add Article' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Article" subtitle="Blog" />
      <CreateArticle />
    </>
  )
}

export default Page
