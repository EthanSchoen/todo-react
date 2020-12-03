// types
export interface Task {
  taskId: string;
  task: string;
  complete: boolean;
  list: TaskList;
}

export interface TaskList {
  listId: string;
  name: string;
  user: string;
}
