import { FC } from 'react';

import TaskList from '@/components/TaskList';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TaskInterface } from '@/interfaces/task';

interface TasksTableProps {
  tasks: TaskInterface[] | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[] | null>>;
  isLoading: boolean;
  isError: boolean;
  isIdle: boolean;
  error: string | null;
}

const TasksTable: FC<TasksTableProps> = ({
  tasks,
  isLoading,
  isError,
  isIdle,
  error,
  setTasks,
}) => {
  return (
    <Table>
      <TableCaption className="hidden">A list of tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={6}>Loading...</TableCell>
          </TableRow>
        )}
        {isError && (
          <TableRow>
            <TableCell colSpan={6}>
              <p>Something went wrong:</p>
              <p>
                <strong>{error}</strong>
              </p>
            </TableCell>
          </TableRow>
        )}
        {isIdle && tasks && <TaskList tasks={tasks} setTasks={setTasks} />}
      </TableBody>
    </Table>
  );
};

export default TasksTable;
