import React, { useCallback, useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from 'react-bootstrap/esm/Button';
import NewTask from './NewTask';
import { Task, TaskList } from './types';
import TaskElement from './TaskElement';
import ListElement from './ListElement';

type TaskAction = {
  type: string;
  payload: {
    id?: string;
    task?: Task;
  };
};

type ListAction = {
  type: string;
  payload: {
    id?: string;
    list?: TaskList;
  };
};

// reducer actions
export const TASK_ADD = 'TASK_ADD';
export const TASK_TOGGLE = 'TASK_TOGGLE';
export const TASK_REMOVE = 'TASK_REMOVE';
export const TASK_EDIT = 'TASK_EDIT';
export const LIST_REMOVE = 'LIST_REMOVE';
export const LIST_EDIT = 'LIST_EDIT';

// reducers
const taskReducer = (state: Task[], action: TaskAction) => {
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

const listReducer = (state: TaskList[], action: ListAction) => {
  console.log(action);
  if (action.type === LIST_REMOVE) {
    return state.filter((list) => {
      if (list.id !== action.payload.id) return list;
    });
  } else if (action.type === LIST_EDIT) {
    return state.map((list) => {
      if (!action.payload.list) return list;
      if (list.id === action.payload.list.id)
        list.listName = action.payload.list.listName;
      return list;
    });
  }
  return state;
};

const Application = () => {
  const [tasks, taskDispatch] = useReducer(taskReducer, [
    // test data
    { id: uuid(), complete: false, taskString: 'test task 1' },
    { id: uuid(), complete: true, taskString: 'test task 2' },
    { id: uuid(), complete: false, taskString: 'test task 3' },
    { id: uuid(), complete: false, taskString: 'test task 4' },
    // test data
  ]);
  const [taskLists, listDispatch] = useReducer(listReducer, [
    // test data
    { id: uuid(), listName: 'Test List 1' },
    { id: uuid(), listName: 'Test List 2' },
    { id: uuid(), listName: 'Test List 3' },
    { id: uuid(), listName: 'Test List 4' },
    // test data
  ]);
  const [loggedin, setLoggedin] = useState(false);
  const [currentList, setCurrentList] = useState('');

  const addTask = useCallback(
    (newtask: string) => {
      taskDispatch({
        type: TASK_ADD,
        payload: {
          task: { id: uuid(), complete: false, taskString: newtask },
        },
      });
    },
    [taskDispatch]
  );
  const toggleTask = useCallback(
    (id: string) => {
      taskDispatch({
        type: TASK_TOGGLE,
        payload: {
          id: id,
        },
      });
    },
    [taskDispatch]
  );
  const removeTask = useCallback(
    (id: string) => {
      taskDispatch({
        type: TASK_REMOVE,
        payload: {
          id: id,
        },
      });
    },
    [taskDispatch]
  );
  const editTask = useCallback(
    (task: Task) => {
      taskDispatch({
        type: TASK_EDIT,
        payload: {
          task: task,
        },
      });
    },
    [taskDispatch]
  );
  const removeList = useCallback(
    (id: string) => {
      listDispatch({
        type: LIST_REMOVE,
        payload: {
          id: id,
        },
      });
    },
    [taskDispatch]
  );
  const editList = useCallback(
    (list: TaskList) => {
      listDispatch({
        type: LIST_EDIT,
        payload: {
          list: list,
        },
      });
    },
    [taskDispatch]
  );

  return (
    <div>
      <h1 className="mainHeader" onClick={(_) => setCurrentList('')}>
        {currentList === '' ? 'Things Todo' : currentList}
      </h1>
      {loggedin ? (
        currentList === '' ? (
          // <ListSelect setList={setCurrentList} />
          <ul>
            {taskLists.map((taskList) => (
              <ListElement
                key={taskList.id}
                setList={setCurrentList}
                list={taskList}
                remove={removeList}
                edit={editList}
              />
            ))}
          </ul>
        ) : (
          <div>
            <NewTask onSubmit={addTask} />
            <hr />
            <ul>
              {tasks.map((t) => (
                <TaskElement
                  key={t.id}
                  task={t}
                  toggle={toggleTask}
                  remove={removeTask}
                  edit={editTask}
                />
              ))}
            </ul>
          </div>
        )
      ) : (
        <div>
          <Button onClick={(_) => setLoggedin(true)}>
            Click Here to Log In
          </Button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
