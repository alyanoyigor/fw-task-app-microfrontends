import { useEffect } from 'react';

import { TableCell, TableRow } from '@/components/ui/table';
import { TaskInterface } from '@/interfaces/task';
import TaskMenu from './TaskMenu';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[] | null>>;
}

function TaskList({ tasks, setTasks }: TaskListProps) {
  useEffect(() => {
    const createTaskListener = ({ detail: data }: any) => {
      setTasks((tasks) => (tasks ? [...tasks, data] : []));
    };
    const deleteTaskListener = ({ detail: id }: any) => {
      setTasks((tasks) =>
        tasks ? tasks.filter((task) => task.id !== id) : []
      );
    };
    const updateTaskListener = ({ detail: data }: any) => {
      setTasks((tasks) =>
        tasks ? tasks.map((task) => (task.id === data.id ? data : task)) : []
      );
    };

    window.addEventListener('TASK_CREATED', createTaskListener);
    window.addEventListener('TASK_DELETED', deleteTaskListener);
    window.addEventListener('TASK_UPDATED', updateTaskListener);

    return () => {
      window.removeEventListener('TASK_CREATED', createTaskListener);
      window.removeEventListener('TASK_DELETED', deleteTaskListener);
      window.removeEventListener('TASK_UPDATED', updateTaskListener);
    };
  }, []);

  if (!tasks.length) {
    return (
      <TableRow>
        <TableCell colSpan={6}>No tasks found</TableCell>
      </TableRow>
    );
  }

  return tasks.map((task: TaskInterface) => (
    <TableRow key={task.id}>
      <TableCell className="font-medium">{task.title}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>{format(task.deadline, 'dd/MM/yyyy')}</TableCell>
      <TableCell className="w-[1%] text-right">
        <TaskMenu task={task} />
      </TableCell>
    </TableRow>
  ));
}

export default TaskList;
