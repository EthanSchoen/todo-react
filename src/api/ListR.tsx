import React, { SetStateAction } from 'react';
import { TaskList } from '../types';

export default {
  getLists(
    setLists: React.Dispatch<SetStateAction<TaskList[]>>,
    userId: string
  ) {
    fetch('http://localhost:8080/lists?user=' + userId, {
      method: 'get',
      mode: 'cors',
    })
      .then((d) => d.text())
      .then((j) => {
        setLists(JSON.parse(j));
      });
  },
  addListFactory(
    setLists: React.Dispatch<SetStateAction<TaskList[]>>,
    userId: string
  ) {
    return (newlist: string) => {
      fetch('http://localhost:8080/addList', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newlist,
          user: userId,
        }),
      }).then((d) => {
        this.getLists(setLists, userId);
      });
    };
  },
  removeListFactory(setLists: React.Dispatch<SetStateAction<TaskList[]>>) {
    return (list: TaskList) => {
      fetch('http://localhost:8080/removeList', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      }).then((d) => {
        this.getLists(setLists, list.user);
      });
    };
  },
  editListFactory(setLists: React.Dispatch<SetStateAction<TaskList[]>>) {
    return (list: TaskList, setEdit: Function) => {
      fetch('http://localhost:8080/editList', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      }).then((d) => {
        fetch('http://localhost:8080/lists?user=' + list.user, {
          method: 'get',
          mode: 'cors',
        })
          .then((d) => d.text())
          .then((j) => {
            var obj = JSON.parse(j);
            setLists(obj);
            setEdit(false);
          });
      });
    };
  },
};
