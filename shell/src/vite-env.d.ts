/// <reference types="vite/client" />

declare module 'task-list/index' {
  const TaskList: React.ComponentType;
  export default TaskList;
}

declare module 'task-editor/index' {
  const TaskEditor: React.ComponentType;
  export default TaskEditor;
}

declare module 'auth/index' {
  export const mount: (element: HTMLElement | null) => void;
}
