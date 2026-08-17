'use client'

import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import type { TaskType } from './data'

const TaskItem = ({ task, onOpenDetail, handleToggleComplete }: { task: TaskType; onOpenDetail: () => void; handleToggleComplete: (id: string, checked: boolean) => void }) => {
  const { title, assignee, status, priority, due, tasks, comments } = task

  return (
    <>
      <div className="border-bottom py-2 px-3 d-flex gap-2 align-items-center">
        <Icon icon="grip-horizontal" className="align-middle sort-handle" />
        <FormCheckInput type="checkbox" className="rounded-circle mt-0 fs-16" checked={task.status === 'completed'} onChange={(e) => handleToggleComplete(task.id, e.target.checked)} />
        <span className="link-reset fw-medium" onClick={onOpenDetail}>
          {title}
        </span>

        <div className="d-flex align-items-center gap-3 flex-wrap justify-content-md-end ms-auto">
          <div className="avatar-group avatar-group-sm flex-shrink-0">
            {assignee.map((assignee, idx) => (
              <OverlayTrigger key={idx} overlay={<Tooltip>{assignee.name}</Tooltip>}>
                <div className="avatar">
                  <Image src={assignee.image} alt="" className="rounded-circle fs-24 avatar-img-size" />
                </div>
              </OverlayTrigger>
            ))}
          </div>

          <div className="flex-shrink-0">
            <span className={clsx('badge', status === 'pending' ? 'badge-outline-warning' : status === 'urgent' ? 'badge-outline-danger' : 'badge-outline-success')}>{toPascalCase(status)}</span>
          </div>

          <ul className="list-inline fs-13 text-end flex-shrink-0 mb-0">
            <li className="list-inline-item">
              <Icon icon="calendar" className="text-muted fs-16 me-1 align-middle" />
              <span className="fw-semibold">{due}</span>
            </li>
            <li className="list-inline-item ms-1">
              <Icon icon="list-details" className="text-muted fs-16 me-1 align-middle" />
              <span className="fw-medium">
                {tasks.done}/{tasks.total}
              </span>
            </li>
            <li className="list-inline-item ms-1">
              <Icon icon="messages" className="text-muted fs-16 me-1 align-middle" />
              <span className="fw-medium">{comments}</span>
            </li>
          </ul>
          <div className="flex-shrink-0">
            <span className={clsx('badge p-1', priority === 'high' ? 'badge-soft-danger' : priority === 'medium' ? 'badge-soft-warning' : 'badge-soft-success')}>{toPascalCase(priority)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskItem
