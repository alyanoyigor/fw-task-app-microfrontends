import { useState } from 'react';

import { getTasks } from './api/getTasks';
import useInitialFetch from './hooks/useInitialFetch';
import { TaskInterface } from './interfaces/task';

import TasksTable from './components/TasksTable';
import TaskDialog from './components/TaskDialog';
import TaskFilters from './components/TaskFilters';
import { Button } from './components/ui/button';

const App = ({
  supabase,
  onNavigate,
}: {
  supabase?: any;
  onNavigate?: any;
}) => {
  const {
    data: tasks,
    setData: setTasks,
    isLoading,
    isError,
    isIdle,
    error,
  } = useInitialFetch<TaskInterface[]>({
    initialValue: [],
    asyncAction: () => getTasks(supabase),
  });
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setOpenFilters(true)}>
          Settings
        </Button>
      </div>
      <TaskDialog
        open={openFilters}
        onOpenChange={setOpenFilters}
        title="Filter Tasks"
      >
        <TaskFilters
          onCloseDialog={() => setOpenFilters(false)}
          onNavigate={onNavigate}
          setTasks={setTasks}
          supabase={supabase}
        />
      </TaskDialog>
      <TasksTable
        tasks={tasks}
        setTasks={setTasks}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isIdle={isIdle}
      />
    </>
  );
};

export default App;
