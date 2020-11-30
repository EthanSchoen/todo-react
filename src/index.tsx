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

// reducer
const reducer = (state: Task[], action: Action) => {
  if (action.type === TASK_ADD) {
    // if task is not undefined, return state with new task added
    return action.payload.task ? [action.payload.task, ...state] : state;
  } else if (action.type === TASK_TOGGLE) {
  } else if (action.type === TASK_REMOVE) {
  }
  return state;
};

const Application = () => {
  const [tasks, dispatch] = useReducer(reducer, [
    // test data
    { id: uuid(), complete: false, taskString: 'test task 1' },
    { id: uuid(), complete: false, taskString: 'test task 2' },
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
  return (
    <div>
      <h1>Things todo</h1>
      <NewTask />
      <hr />
      <List tasks={tasks} />
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
