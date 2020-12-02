// types
export interface Task {
  taskId: string;
  task: string;
  complete: boolean;
}

export interface TaskList {
  listId: string;
  name: string;
  user: string;
}
