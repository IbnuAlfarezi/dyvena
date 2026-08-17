import PageBreadcrumb from '@/components/PageBreadcrumb'
import { type Metadata } from 'next'
import ProductsPage from './components/ProductsPage'

export const metadata: Metadata = { title: 'Products Grid' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Products Grid" subtitle="Ecommerce" />

      <ProductsPage />
    </>
  )
}

export default Page
