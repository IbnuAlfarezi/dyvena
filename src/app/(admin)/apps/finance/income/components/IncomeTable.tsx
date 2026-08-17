'use client'
import user5 from '@/assets/images/users/user-5.jpg'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState, type SortingState, type Row as TableRow, type Table as TableType } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Card, CardFooter, CardHeader, Col, Form, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'
import { IncomeType, incomeData } from './data'

const columnHelper = createColumnHelper<IncomeType>()

const IncomeTable = () => {
  const [data, setData] = useState<IncomeType[]>(() => [...incomeData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showExpenseModal, toggleExpenseModal] = useToggle(false)

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({ ...pagination, pageIndex: 0 })
    setShowDeleteModal(false)
  }

  const columns = [
    {
      id: 'select',
      size: 45,
      header: ({ table }: { table: TableType<IncomeType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14 mt-0" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<IncomeType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14 mt-0" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
    },

    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => (
        <Link href="" className="fw-semibold link-reset">
          {info.getValue()}
        </Link>
      ),
    }),

    columnHelper.accessor('title', { header: 'Income Title' }),

    columnHelper.accessor('source', {
      header: 'Source',
      filterFn: 'equalsString',
      enableColumnFilter: true,
    }),

    columnHelper.accessor('paymentMethod', {
      header: 'Payment Type',
      cell: ({ row }) => (
        <div className="d-flex align-items-center">
          <Image src={row.original.paymentMethod.image} alt="card" className="me-2" height={26} />
          <span>{row.original.paymentMethod.number}</span>
        </div>
      ),
    }),

    columnHelper.accessor('amount', {
      header: 'Amount',
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <span className={`badge badge-label ${row.original.status === 'received' ? 'bg-success-subtle text-success' : row.original.status === 'pending' ? 'bg-warning-subtle text-warning ' : row.original.status === 'refunded' ? 'bg-danger-subtle text-danger' : ''}`}>
          {toPascalCase(row.original.status)}
        </span>
      ),
    }),

    columnHelper.accessor('date', {
      header: 'Date',
      cell: ({ row }) => (
        <>
          {row.original.date} <small className="text-muted">{row.original.time}</small>
        </>
      ),
    }),

    columnHelper.accessor('receivedBy', {
      header: 'Received By',
      cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Image src={row.original.receivedBy.image} alt={row.original.receivedBy.name} className="avatar-xs rounded-circle" />
          <span>{row.original.receivedBy.name}</span>
        </div>
      ),
    }),

    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<IncomeType> }) => (
        <div className="d-flex justify-content-center gap-1">
          <Button size="sm" className="btn-default btn-icon" title="View">
            <Icon icon="eye" className="fs-lg" />
          </Button>
          <Button size="sm" className="btn-default btn-icon" title="Edit" onClick={() => toggleExpenseModal()}>
            <Icon icon="edit" className="fs-lg" />
          </Button>
          <Button
            size="sm"
            className="btn-default btn-icon"
            title="Delete"
            onClick={() => {
              toggleDeleteModal()
              setSelectedRowIds({ [row.id]: true })
            }}
          >
            <Icon icon="trash" className="fs-lg" />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination, rowSelection: selectedRowIds },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setSelectedRowIds,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableRowSelection: true,
  })

  const totalItems = table.getFilteredRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  return (
    <Card>
      <CardHeader className="border-light justify-content-between">
        <div className="d-flex gap-2">
          <div className="app-search">
            <input type="search" className="form-control" placeholder="Search income..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>

          <Button variant="primary" onClick={toggleExpenseModal}>
            <Icon icon="plus" className="me-1" /> Add Income
          </Button>

          {Object.keys(selectedRowIds).length > 0 && (
            <Button variant="danger" onClick={toggleDeleteModal}>
              Delete
            </Button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="me-2 fw-semibold">Filter By:</span>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('source')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('source')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Source</option>
              <option value="Sales">Sales</option>
              <option value="Services">Services</option>
              <option value="Consulting">Consulting</option>
              <option value="Investments">Investments</option>
              <option value="Affiliate">Affiliate</option>
              <option value="Other">Other</option>
            </FormSelect>
            <Icon icon="briefcase" className="app-search-icon text-muted" />
          </div>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Status</option>

              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </FormSelect>
            <Icon icon="circle-check" className="app-search-icon text-muted" />
          </div>

          <div>
            <FormSelect className="form-control" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
      </CardHeader>

      <DataTable<IncomeType> table={table} emptyMessage="No expenses found" />

      {table.getRowModel().rows.length > 0 && (
        <CardFooter className="border-0">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="Income Records"
            showInfo
            previousPage={table.previousPage}
            canPreviousPage={table.getCanPreviousPage()}
            pageCount={table.getPageCount()}
            pageIndex={pageIndex}
            setPageIndex={table.setPageIndex}
            nextPage={table.nextPage}
            canNextPage={table.getCanNextPage()}
          />
        </CardFooter>
      )}

      <DeleteConfirmationModal show={showDeleteModal} onHide={toggleDeleteModal} onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="expense" />

      <Modal show={showExpenseModal} onHide={toggleExpenseModal} size="lg" centered>
        <ModalHeader closeButton>
          <ModalTitle as="h5">Add New Income</ModalTitle>
        </ModalHeader>
        <Form>
          <ModalBody>
            <Row className="g-3">
              <Col md={6}>
                <FormLabel>
                  Income Title <span className="text-danger">*</span>
                </FormLabel>
                <FormControl type="text" id="incomeTitle" placeholder="Enter income title" required />
              </Col>
              <Col md={6}>
                <FormLabel>
                  Amount ($) <span className="text-danger">*</span>
                </FormLabel>
                <FormControl type="number" step="0.01" id="incomeAmount" className="form-control" placeholder="Enter amount" required />
              </Col>
              <Col md={6}>
                <FormLabel>
                  Income Source <span className="text-danger">*</span>
                </FormLabel>
                <FormSelect id="incomeSource" required>
                  <option value="">Select source</option>
                  <option value="Sales">Sales</option>
                  <option value="Services">Services</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Investments">Investments</option>
                  <option value="Affiliate">Affiliate</option>
                  <option value="Other">Other</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel>Payment Type</FormLabel>
                <FormSelect>
                  <option value="">Select payment type</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel>Client Name</FormLabel>
                <FormControl type="text" id="incomeClient" placeholder="Enter client or company name" />
              </Col>
              <Col md={6}>
                <FormLabel>Status</FormLabel>
                <FormSelect>
                  <option defaultValue="Received">Received</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel>Date &amp; Time</FormLabel>
                <Flatpickr type="text" className="form-control" options={{ defaultDate: new Date(), dateFormat: 'd M, Y H:i' }} />
              </Col>
              <Col md={6}>
                <FormLabel>Received By</FormLabel>
                <div className="d-flex align-items-center gap-2">
                  <Image src={user5} alt="user" className="avatar-xs rounded-circle" />
                  <input type="text" id="incomeReceivedBy" className="form-control" placeholder="Enter receiver name" />
                </div>
              </Col>
              <Col xs={12}>
                <FormLabel>Notes</FormLabel>
                <textarea id="incomeNotes" className="form-control" rows={3} placeholder="Optional remarks or description" />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={toggleExpenseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <Icon icon="device-floppy" className="me-1" /> Save Income
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Card>
  )
}

export default IncomeTable
