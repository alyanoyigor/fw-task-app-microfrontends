import { createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'

const LazyTaskEditor = React.lazy(() => import('task-editor/index'));
const LazyTaskList = React.lazy(() => import('task-list/index'));

export const Route = createLazyFileRoute('/tasks')({
  component: TaskList,
})

function TaskList() {
  return (
    <div className="p-2">
      <LazyTaskEditor />
      <LazyTaskList />
    </div>
  )
}
