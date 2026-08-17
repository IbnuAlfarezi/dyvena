'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState, type SortingState, type Row as TableRow, type Table as TableType } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { Button, Card, CardFooter, CardHeader, Col, Form, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import { useToggle } from 'usehooks-ts'
import { PayrollType, payrollData } from './data'

// Table setup
const columnHelper = createColumnHelper<PayrollType>()

const PayRollTable = () => {
  const [data, setData] = useState<PayrollType[]>(() => [...payrollData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPayrollModal, togglePayrollModal] = useToggle(false)

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
      header: ({ table }: { table: TableType<PayrollType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14 mt-0" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<PayrollType> }) => <input type="checkbox" className="form-check-input form-check-input-light fs-14 mt-0" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },

    columnHelper.accessor('id', { header: 'Employee ID' }),

    columnHelper.accessor('employee.name', {
      header: 'Employee Name',
      cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <div className="avatar avatar-sm">
            <Image src={row.original.employee.image} alt={row.original.employee.name} className="img-fluid rounded-circle" />
          </div>
          <div>
            <h5 className="mb-0 lh-base fs-base">{row.original.employee.name}</h5>
            <p className="text-muted fs-xs mb-0">{row.original.employee.email}</p>
          </div>
        </div>
      ),
    }),

    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('designation', { header: 'Designation' }),
    columnHelper.accessor('date', { header: 'Pay Period' }),
    columnHelper.accessor('salary', { header: 'Base Salary' }),
    columnHelper.accessor('allowance', { header: 'Allowances' }),
    columnHelper.accessor('actualSalary', {
      header: 'Actual Salary',
      cell: ({ row }) => <strong>{row.original.actualSalary}</strong>,
    }),
    columnHelper.accessor('deductions', { header: 'Deductions' }),
    columnHelper.accessor('netPay', {
      header: 'Net Pay',
      cell: ({ row }) => <strong>{row.original.netPay}</strong>,
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => <span className={`badge ${row.original.status === 'paid' ? 'bg-success-subtle text-success' : row.original.status === 'processing' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`}>{toPascalCase(row.original.status)}</span>,
    }),

    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<PayrollType> }) => (
        <div className="d-flex align-items-center justify-content-end gap-1">
          <Button size="sm" className="btn-default btn-icon" title="View">
            <Icon icon="eye" className="fs-lg" />
          </Button>
          <Button size="sm" className="btn-default btn-icon" title="Edit" onClick={() => togglePayrollModal()}>
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
            <input type="search" className="form-control" placeholder="Search payroll records..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>
          <Button variant="primary" onClick={togglePayrollModal}>
            <Icon icon="plus" className="me-1" /> New Payroll
          </Button>

          {Object.keys(selectedRowIds).length > 0 && (
            <Button variant="danger" onClick={toggleDeleteModal}>
              Delete
            </Button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="me-2 fw-semibold">Filter By:</span>
          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('department')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('department')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Department</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Research & Development">Research & Development</option>
            </FormSelect>
            <Icon icon="layout" className="app-search-icon text-muted" />
          </div>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option>Status</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
              <option value="on-hold">On Hold</option>
              <option value="pending-review">Pending Review</option>
            </FormSelect>
            <Icon icon="arrows-shuffle" className="app-search-icon text-muted" />
          </div>

          <div className="app-search">
            <FormSelect className="form-control my-1 my-md-0" value={(table.getColumn('date')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('date')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option>Pay Period</option>
              <option value="Oct 2025">Oct 2025</option>
              <option value="Sep 2025">September 2025</option>
              <option value="Aug 2025">August 2025</option>
              <option value="Jul 2025">July 2025</option>
            </FormSelect>
            <Icon icon="calendar" className="app-search-icon text-muted" />
          </div>

          <div>
            <FormSelect className="form-control" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
      </CardHeader>

      <DataTable<PayrollType> table={table} emptyMessage="No payroll records found" />

      {table.getRowModel().rows.length > 0 && (
        <CardFooter className="border-0">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="records"
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

      <DeleteConfirmationModal show={showDeleteModal} onHide={toggleDeleteModal} onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="payroll record" />

      <Modal show={showPayrollModal} onHide={togglePayrollModal} size="lg" centered>
        <ModalHeader closeButton>
          <ModalTitle as="h5" className="fw-semibold">
            <Icon icon="plus" className="me-1" /> Add Payroll Record
          </ModalTitle>
        </ModalHeader>
        <Form>
          <ModalBody>
            <Row className="g-3">
              <Col md={6}>
                <FormLabel>
                  Employee Name <span className="text-danger">*</span>
                </FormLabel>
                <FormSelect id="employeeName" className="form-select" required>
                  <option value="">Select Employee</option>
                  <option value="1">Samantha Green</option>
                  <option value="2">David Lee</option>
                  <option value="3">Maria Smith</option>
                  <option value="4">Michael Adams</option>
                  <option value="5">Olivia Brown</option>
                  <option value="6">Daniel Carter</option>
                  <option value="7">Emily Davis</option>
                  <option value="8">James Walker</option>
                  <option value="9">Sophia Martinez</option>
                  <option value="10">Henry Clark</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel>
                  Department <span className="text-danger">*</span>
                </FormLabel>
                <FormSelect id="department" className="form-select" required>
                  <option value="">Select Department</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                  <option>IT</option>
                  <option>Operations</option>
                  <option>Marketing</option>
                  <option>Design</option>
                  <option>Sales</option>
                  <option>Customer Support</option>
                  <option>Research & Development</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel>
                  Role / Position <span className="text-danger">*</span>
                </FormLabel>
                <FormControl type="text" placeholder="Enter position title" required />
              </Col>
              <Col md={6}>
                <FormLabel>
                  Pay Period <span className="text-danger">*</span>
                </FormLabel>
                <FormSelect id="payPeriod" className="form-select" required>
                  <option value="">Select Period</option>
                  <option>October 2025</option>
                  <option>September 2025</option>
                  <option>August 2025</option>
                  <option>July 2025</option>
                </FormSelect>
              </Col>
              <Col md={6}>
                <FormLabel>
                  Base Salary ($) <span className="text-danger">*</span>
                </FormLabel>
                <FormControl type="number" placeholder="e.g., 5000" required />
              </Col>
              <Col md={6}>
                <FormLabel>Allowances ($)</FormLabel>
                <FormControl type="number" placeholder="e.g., 300" />
              </Col>
              <Col md={6}>
                <FormLabel>Total Earnings ($)</FormLabel>
                <FormControl type="number" placeholder="Auto-calculated" readOnly />
              </Col>
              <Col md={6}>
                <FormLabel>Deductions ($)</FormLabel>
                <FormControl type="number" placeholder="e.g., 100" />
              </Col>
              <Col md={6}>
                <FormLabel>Net Pay ($)</FormLabel>
                <FormControl type="number" placeholder="Auto-calculated" readOnly />
              </Col>
              <Col md={6}>
                <FormLabel>
                  Pay Status <span className="text-danger">*</span>
                </FormLabel>
                <FormSelect required>
                  <option>Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Processing">Processing</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Pending Review">Pending Review</option>
                </FormSelect>
              </Col>
              <Col md={12}>
                <FormLabel>Remarks</FormLabel>
                <textarea className="form-control" rows={2} placeholder="Optional remarks or notes" />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={togglePayrollModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <Icon icon="device-floppy" className="me-1" /> Save Payroll
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Card>
  )
}

export default PayRollTable
