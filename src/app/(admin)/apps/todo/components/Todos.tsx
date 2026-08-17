'use client'
import user1 from '@/assets/images/users/user-1.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Offcanvas, Row } from 'react-bootstrap'
import { ReactSortable, Sortable } from 'react-sortablejs'
import { useToggle } from 'usehooks-ts'
import { TaskType, taskData } from './data'
import TaskDetailModal from './TaskDetailModal'
import TaskItem from './TaskItem'

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>(taskData)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showSidebar, toggleSidebar] = useToggle(false)

  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'Medium', status: 'New' })
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTask.title,
        status: newTask.status.toLowerCase() as TaskType['status'],
        priority: newTask.priority.toLowerCase() as TaskType['priority'],
        due: newTask.dueDate,
        tasks: { done: 3, total: 6 },
        comments: 12,
        assignee: [
          { name: 'John Doe', image: user1 },
          { name: 'Jane Doe', image: user2 },
        ],
      },
    ])
    setShowAddModal(false)
    setNewTask({ title: '', dueDate: '', priority: 'medium', status: 'new' })
  }

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = filterStatus === 'all' || task.status === filterStatus
    const matchPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchPriority && matchSearch
  })

  const handleToggleComplete = (id: string, checked: boolean) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: checked ? 'completed' : 'new' } : task)))
  }

  const sortableOptions: Partial<Sortable.Options> = {
    handle: '.sort-handle',
    ghostClass: 'sortable-item-ghost',
    group: 'nested',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
  }
  return (
    <div className="outlook-box gap-1">
      <Offcanvas responsive="lg" show={showSidebar} onHide={toggleSidebar} className="outlook-left-menu outlook-left-menu-lg" tabIndex={-1}>
        <SimpleBar className="card h-100 mb-0 rounded-end-0">
          <CardBody>
            <button className="btn btn-success fw-medium w-100" onClick={() => setShowAddModal(true)}>
              Create New <Icon icon="plus" className="ms-1" />
            </button>
            <div className="my-3">
              <FormLabel>Select Date</FormLabel>
              <Flatpickr type="text" options={{ dateFormat: 'M d, Y', defaultDate: new Date() }} className="form-control flatpickr-input" />
            </div>

            <FormGroup className="mb-3">
              <FormLabel>Select Priority</FormLabel>
              <FormSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="urgent">Urgent</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Select Status</FormLabel>
              <FormSelect value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </FormSelect>
            </FormGroup>
          </CardBody>
        </SimpleBar>
      </Offcanvas>

      <Card className="h-100 mb-0 rounded-start-0 flex-grow-1 border-start-0">
        <CardHeader className="d-lg-none d-flex gap-2">
          <button className="btn btn-default btn-icon" type="button" onClick={toggleSidebar} aria-controls="emailSidebaroffcanvas">
            <Icon icon="menu-4" className="fs-lg" />
          </button>

          <div className="app-search">
            <FormControl type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>
        </CardHeader>

        <CardHeader className="card-bg justify-content-between">
          <CardTitle as="h4">Tasks</CardTitle>
          <div className="app-search">
            <FormControl type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." />
            <Icon icon="search" className="app-search-icon text-muted" />
          </div>
        </CardHeader>

        <SimpleBar className="card-body p-0" style={{ height: 'calc(100% - 100px)' }}>
          <div className="nested-sortable-handle">
            <ReactSortable {...sortableOptions} list={tasks} setList={setTasks}>
              {filteredTasks.map((task, idx) => (
                <TaskItem key={idx} task={task} onOpenDetail={() => setSelectedTask(task)} handleToggleComplete={handleToggleComplete} />
              ))}
            </ReactSortable>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-2 p-3">
            <strong>Loading...</strong>
            <div className="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
          </div>
        </SimpleBar>
      </Card>

      <Modal size="lg" show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle as={'h5'}>Add New Task</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="mb-3">
              <FormLabel>Task Title</FormLabel>
              <FormControl placeholder="Enter task title" required />
            </FormGroup>
            <Row className="g-3">
              <Col md={6}>
                <FormLabel>Due Date</FormLabel>
                <Flatpickr required className="form-control" type="date" options={{ dateFormat: 'd M, Y', defaultDate: new Date() }} />
              </Col>
              <Col md={6}>
                <FormLabel>Priority</FormLabel>
                <FormSelect>
                  <option>Low</option>
                  <option>Medium</option>
                  <option defaultChecked>High</option>
                  <option>Urgent</option>
                </FormSelect>
              </Col>
            </Row>
            <FormGroup className="mt-3">
              <FormLabel>Status</FormLabel>
              <FormSelect value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                <option>New</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Scheduled</option>
                <option>Urgent</option>
              </FormSelect>
            </FormGroup>

            <div className="mt-3">
              <FormLabel className="fw-semibold">Assign To</FormLabel>
              <FormControl type="text" name="taskAvatars" placeholder="Comma-separated user IDs" />
              <small className="text-muted">set &#64;username</small>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </ModalFooter>
      </Modal>
      {selectedTask && <TaskDetailModal task={selectedTask} showDetailModal={!!selectedTask} toggleDetailModal={() => setSelectedTask(null)} />}
    </div>
  )
}

export default TodosPage
