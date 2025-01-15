import TasksHeader from './components/TasksHeader';

const App = ({ supabase }: { supabase?: any }) => {
  return <TasksHeader supabase={supabase!} />;
};

export default App;
