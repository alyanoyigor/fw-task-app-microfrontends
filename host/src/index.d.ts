declare module 'task-list/index' {
  const TaskList: React.ComponentType<{
    supabase: SupabaseClient;
    onNavigate: NavigateFn;
  }>;
  export default TaskList;
}

declare module 'task-editor/index' {
  const TaskEditor: React.ComponentType<{
    supabase: SupabaseClient;
    onNavigate: NavigateFn;
  }>;
  export default TaskEditor;
}

declare module 'auth/index' {
  export const mount: (
    element: HTMLElement | null,
    props: { onNavigate: NavigateFn; supabase: SupabaseClient }
  ) => void;
}
