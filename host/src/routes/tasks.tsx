import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import React from 'react';
import supabase from '../lib/supabase';

const LazyTaskEditor = React.lazy(() => import('task-editor/index'));
const LazyTaskList = React.lazy(() => import('task-list/index'));

export const Route = createFileRoute('/tasks')({
  component: TaskList,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error('Not authenticated');
    }
  },
  errorComponent: () => {
    return <Navigate to="/auth" />;
  },
});

function TaskList() {
  const navigate = useNavigate({ from: '/tasks' });

  return (
    <div className="p-2">
      <LazyTaskEditor supabase={supabase} onNavigate={navigate} />
      <LazyTaskList supabase={supabase} onNavigate={navigate} />
    </div>
  );
}
