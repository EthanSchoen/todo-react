import React, { useCallback, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom';
import NewTask from './NewTask';
import List from './List';
import { Task } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

type Action = {
  type: string;
  payload: {
    id?: string;
    task?: Task;
  };
};

// reducer actions
export const TASK_ADD = 'TASK_ADD';
export const TASK_TOGGLE = 'TASK_TOGGLE';
export const TASK_REMOVE = 'TASK_REMOVE';
export const TASK_EDIT = 'TASK_EDIT';

// reducer
const reducer = (state: Task[], action: Action) => {
  if (action.type === TASK_ADD) {
    // if task is not undefined, return state with new task added
    return action.payload.task ? [action.payload.task, ...state] : state;
  } else if (action.type === TASK_TOGGLE) {
    return state.map((task) => {
      if (task.id !== action.payload.id) return task;
      task.complete = !task.complete;
      return task;
    });
  } else if (action.type === TASK_REMOVE) {
    return state.filter((t) => t.id !== action.payload.id);
  } else if (action.type === TASK_EDIT) {
    return state.map((task) => {
      if (!action.payload.task) return task;
      if (task.id === action.payload.task.id)
        task.taskString = action.payload.task.taskString;
      return task;
    });
  }
  return state;
};

const Application = () => {
  const [tasks, dispatch] = useReducer(reducer, [
    // test data
    { id: uuid(), complete: false, taskString: 'test task 1' },
    { id: uuid(), complete: true, taskString: 'test task 2' },
    { id: uuid(), complete: false, taskString: 'test task 3' },
    { id: uuid(), complete: false, taskString: 'test task 4' },
    // test data
  ]);

  const addTask = useCallback(
    (newtask: string) => {
      dispatch({
        type: TASK_ADD,
        payload: {
          task: { id: uuid(), complete: false, taskString: newtask },
        },
      });
    },
    [dispatch]
  );
  const toggleTask = useCallback(
    (id: string) => {
      dispatch({
        type: TASK_TOGGLE,
        payload: {
          id: id,
        },
      });
    },
    [dispatch]
  );
  const removeTask = useCallback(
    (id: string) => {
      dispatch({
        type: TASK_REMOVE,
        payload: {
          id: id,
        },
      });
    },
    [dispatch]
  );
  const editTask = useCallback(
    (task: Task) => {
      dispatch({
        type: TASK_EDIT,
        payload: {
          task: task,
        },
      });
    },
    [dispatch]
  );
  return (
    <div>
      <h1>Things todo</h1>
      <NewTask onSubmit={addTask} />
      <hr />
      <List
        tasks={tasks}
        toggle={toggleTask}
        remove={removeTask}
        edit={editTask}
      />
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
