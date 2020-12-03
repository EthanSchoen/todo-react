import React, { SetStateAction, useCallback } from 'react';
import { Task, TaskList } from '../types';

export default {
  getTasks(setTasks: React.Dispatch<SetStateAction<Task[]>>, list: TaskList) {
    fetch('http://localhost:8080/tasks', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    })
      .then((d) => d.text())
      .then((j) => {
        setTasks(JSON.parse(j));
      });
  },
  addTaskFactory(
    setTasks: React.Dispatch<SetStateAction<Task[]>>,
    list: TaskList
  ) {
    return (task: string) => {
      fetch('http://localhost:8080/addTask', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: task,
          complete: false,
          list: list,
        }),
      }).then((d) => {
        this.getTasks(setTasks, list);
      });
    };
  },
  toggleTaskFactory(
    setTasks: React.Dispatch<SetStateAction<Task[]>>,
    list: TaskList
  ) {
    return (task: Task) => {
      fetch('http://localhost:8080/toggleTask', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).then((d) => {
        this.getTasks(setTasks, list);
      });
    };
  },
  removeTaskFactory(
    setTasks: React.Dispatch<SetStateAction<Task[]>>,
    list: TaskList
  ) {
    return (task: Task) => {
      fetch('http://localhost:8080/removeTask', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).then((d) => {
        this.getTasks(setTasks, list);
      });
    };
  },
  editTaskFactory(
    setTasks: React.Dispatch<SetStateAction<Task[]>>,
    list: TaskList
  ) {
    return (task: Task) => {
      fetch('http://localhost:8080/editTask', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).then((d) => {
        fetch('http://localhost:8080/tasks', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(list),
        })
          .then((d) => d.text())
          .then((j) => {
            setTasks(JSON.parse(j));
          });
      });
    };
  },
};
