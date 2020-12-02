import React, { useCallback } from 'react';
import { Task } from '../types';
import { v4 as uuid } from 'uuid';

// reducer actions
export const TASK_ADD = 'TASK_ADD';
export const TASK_TOGGLE = 'TASK_TOGGLE';
export const TASK_REMOVE = 'TASK_REMOVE';
export const TASK_EDIT = 'TASK_EDIT';

type TaskAction = {
  type: string;
  payload: {
    taskId?: string;
    task?: Task;
  };
};

export default {
  reducer(state: Task[], action: TaskAction) {
    if (action.type === TASK_ADD) {
      // if task is not undefined, return state with new task added
      return action.payload.task ? [action.payload.task, ...state] : state;
    } else if (action.type === TASK_TOGGLE) {
      return state.map((task) => {
        if (task.taskId !== action.payload.taskId) return task;
        task.complete = !task.complete;
        return task;
      });
    } else if (action.type === TASK_REMOVE) {
      return state.filter((t) => t.taskId !== action.payload.taskId);
    } else if (action.type === TASK_EDIT) {
      return state.map((task) => {
        if (!action.payload.task) return task;
        if (task.taskId === action.payload.task.taskId)
          task.task = action.payload.task.task;
        return task;
      });
    }
    return state;
  },
  addTaskFactory(taskDispatch: React.Dispatch<TaskAction>) {
    return useCallback(
      (newtask: string) => {
        var new_task = {
          taskId: uuid(),
          complete: false,
          task: newtask,
        };
        fetch('http://localhost:8080/addTask', {
          method: 'post',
          body: JSON.stringify(new_task),
        })
          .then((d) => d.text())
          .then((j) => {
            taskDispatch({
              type: TASK_ADD,
              payload: {
                task: new_task,
              },
            });
          });
      },
      [taskDispatch]
    );
  },
  toggleTaskFactory(taskDispatch: React.Dispatch<TaskAction>) {
    return useCallback(
      (id: string) => {
        taskDispatch({
          type: TASK_TOGGLE,
          payload: {
            taskId: id,
          },
        });
      },
      [taskDispatch]
    );
  },
  removeTaskFactory(taskDispatch: React.Dispatch<TaskAction>) {
    return useCallback(
      (id: string) => {
        taskDispatch({
          type: TASK_REMOVE,
          payload: {
            taskId: id,
          },
        });
      },
      [taskDispatch]
    );
  },
  editTaskFactory(taskDispatch: React.Dispatch<TaskAction>) {
    return useCallback(
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
  },
};
