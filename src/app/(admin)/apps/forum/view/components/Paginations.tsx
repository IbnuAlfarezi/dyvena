import Icon from '@/components/wrappers/Icon'
import Link from 'next/link'

const Paginations = () => {
  return (
    <ul className="pagination pagination-rounded pagination-boxed justify-content-center">
      <li className="page-item">
        <Link className="page-link" href="" aria-label="Previous">
          <Icon icon="chevron-left" className="align-middle fs-lg" />
        </Link>
      </li>
      <li className="page-item">
        <Link className="page-link" href="">
          1
        </Link>
      </li>
      <li className="page-item active">
        <Link className="page-link" href="">
          2
        </Link>
      </li>
      <li className="page-item">
        <Link className="page-link" href="">
          3
        </Link>
      </li>
      <li className="page-item">
        <Link className="page-link" href="">
          4
        </Link>
      </li>
      <li className="page-item">
        <Link className="page-link" href="">
          5
        </Link>
      </li>
      <li className="page-item">
        <Link className="page-link" href="" aria-label="Next">
          <Icon icon="chevron-right" className="align-middle fs-lg" />
        </Link>
      </li>
    </ul>
  )
}

export default Paginations
