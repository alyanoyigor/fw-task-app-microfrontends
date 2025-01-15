import { useEffect, useState } from 'react';

import { createTask } from '@/api/task/create';

import { Button } from './ui/button';

import TaskDialog from './TaskDialog';
import TaskForm from './TaskForm';
import TaskAlertDialog from './TaskAlertDialog';
import { deleteTask } from '@/api/task/delete';
import { BaseTaskInterface, TaskInterface } from '@/interfaces/task';
import { updateTask } from '@/api/task/update';

const TasksHeader = ({ supabase }: { supabase: any }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [updateTaskInfo, setUpdateTaskInfo] = useState<TaskInterface | null>(
    null
  );
  const [deleteTaskInfo, setDeleteTaskInfo] = useState<TaskInterface | null>(
    null
  );

  const deleteTaskAction = async () => {
    try {
      if (!deleteTaskInfo) return;

      await deleteTask({ id: deleteTaskInfo.id, supabase });

      const deleteTaskEvent = new CustomEvent('TASK_DELETED', {
        detail: deleteTaskInfo.id,
      });
      window.dispatchEvent(deleteTaskEvent);
    } catch (error) {
      console.error(error);
    }
  };

  const createTaskAction = async (task: BaseTaskInterface) => {
    try {
      const newTask = await createTask({ supabase, task });
      const addToCartEvent = new CustomEvent('TASK_CREATED', {
        detail: newTask,
      });
      window.dispatchEvent(addToCartEvent);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskAction = async (task: BaseTaskInterface) => {
    try {
      if (!updateTaskInfo) return;

      const updatedTask = await updateTask({
        id: updateTaskInfo.id,
        task,
        supabase,
      });

      const updateTaskEvent = new CustomEvent('TASK_UPDATED', {
        detail: updatedTask,
      });
      window.dispatchEvent(updateTaskEvent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const deleteTaskListener = ({ detail: deleteTaskInfo }: any) => {
      setDeleteTaskInfo(deleteTaskInfo);
      setOpenDelete(true);
    };

    const updateTaskListener = ({ detail: taskInfo }: any) => {
      setUpdateTaskInfo(taskInfo);
      setOpenUpdate(true);
    };

    window.addEventListener('DELETE_TASK', deleteTaskListener);
    window.addEventListener('UPDATE_TASK', updateTaskListener);

    return () => {
      window.removeEventListener('DELETE_TASK', deleteTaskListener);
      window.removeEventListener('UPDATE_TASK', updateTaskListener);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Button onClick={() => setOpenCreate(true)}>Create Task</Button>

      <TaskDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        title="Create Task"
      >
        <TaskForm
          action={createTaskAction}
          actionName="create"
          onCloseDialog={() => setOpenCreate(false)}
        />
      </TaskDialog>

      {updateTaskInfo && (
        <TaskDialog
          open={openUpdate}
          onOpenChange={setOpenUpdate}
          title="Edit Task"
        >
          <TaskForm
            action={updateTaskAction}
            onCloseDialog={() => setOpenUpdate(false)}
            defaultTaskValues={updateTaskInfo}
            actionName="update"
          />
        </TaskDialog>
      )}

      <TaskAlertDialog
        open={openDelete}
        setOpen={setOpenDelete}
        action={deleteTaskAction}
      >
        This action cannot be undone. This will permanently delete your task
        &quot;{deleteTaskInfo?.title}&quot; and it&apos;s data from our servers.
      </TaskAlertDialog>
    </div>
  );
};

export default TasksHeader;
