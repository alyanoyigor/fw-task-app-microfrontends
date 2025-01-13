import { getTasks } from './api/tasks';
import TasksTable from './components/TasksTable';
import useInitialFetch from './hooks/useInitialFetch';
import { TaskInterface } from './interfaces/task';

const App = () => {
  const {
    data: tasks,
    isLoading,
    isError,
    isIdle,
    error,
  } = useInitialFetch<TaskInterface[]>({ initialValue: [], asyncAction: getTasks });

  return <TasksTable tasks={tasks} isLoading={isLoading} isError={isError} error={error} isIdle={isIdle} />;
};

export default App;
