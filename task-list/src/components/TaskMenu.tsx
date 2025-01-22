import { FC } from 'react';
import { Ellipsis } from 'lucide-react';

import { TaskInterface } from '@/interfaces/task';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TaskMenuProps {
  task: TaskInterface;
}

const TaskMenu: FC<TaskMenuProps> = ({ task }: { task: TaskInterface }) => {
  const editTask = () => {
    window.dispatchEvent(
      new CustomEvent('UPDATE_TASK', {
        detail: task,
      })
    );
  };

  const deleteTask = () => {
    window.dispatchEvent(
      new CustomEvent('DELETE_TASK', {
        detail: task,
      })
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={editTask}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteTask}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMenu;
