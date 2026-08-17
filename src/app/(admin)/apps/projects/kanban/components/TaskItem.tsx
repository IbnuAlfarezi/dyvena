import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'

import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import clsx from 'clsx'
import { KanbanTaskType } from './data'
import { useKanbanContext } from './useKanbanContext'

const TaskItem = ({ item }: { item: KanbanTaskType }) => {
  const { newTaskModal, taskForm } = useKanbanContext()
  return (
    <Card className="mb-2 border border-light">
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <span className={clsx('badge  badge-label', item.priority === 'high' ? 'bg-danger-subtle text-danger' : item.priority === 'medium' ? 'bg-warning-subtle text-warning' : item.priority === 'urgent' ? 'bg-danger text-white' : 'bg-success-subtle text-success')}>
            {toPascalCase(item.priority)}
          </span>
          <div className="ms-auto mt-n2">
            <Dropdown>
              <DropdownToggle className="btn btn-icon btn-sm btn-ghost-light text-muted drop-arrow-none">
                <Icon icon="dots-vertical" className="fs-lg" />
              </DropdownToggle>
              <DropdownMenu align="end">
                <DropdownItem>
                  <Icon icon="share" className="me-2" />
                  Share
                </DropdownItem>
                <DropdownItem>
                  <Icon icon="edit" className="me-2" onClick={() => newTaskModal.toggle(item.sectionId, item.id)} />
                  Edit
                </DropdownItem>

                <DropdownItem className="text-danger" onClick={() => taskForm.deleteRecord(item.id)}>
                  <Icon icon="trash" className="me-2" />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <h5 className="mb-2">
          <Link href="" className="link-reset">
            {item.title}
          </Link>
        </h5>

        <div className="d-flex align-items-center mb-2">
          <Image src={item.assignee.image} alt={item.assignee.name} className="rounded-circle me-2" width="28" height="28" />
          <span className="text-muted fw-medium">{item.assignee.name}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-n1 text-muted">
          <span>{item.stats.time}</span>
          <span>
            <Icon icon="list-check" /> {item.stats.task}
          </span>
          <span>
            <Icon icon="link" /> {item.stats.link}
          </span>
          <span>
            <Icon icon="messages" /> {item.stats.messages}
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

export default TaskItem
