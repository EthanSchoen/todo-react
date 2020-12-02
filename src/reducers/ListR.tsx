import React, { useCallback } from 'react';
import { TaskList } from '../types';
import { v4 as uuid } from 'uuid';

// reducer actions
export const LIST_ADD = 'LIST_ADD';
export const LIST_REMOVE = 'LIST_REMOVE';
export const LIST_EDIT = 'LIST_EDIT';

type ListAction = {
  type: string;
  payload: {
    userId: string;
    listId?: string;
    list?: TaskList;
    newlist?: {
      name: string;
      user: string;
    };
  };
};

export default {
  reducer(state: TaskList[], action: ListAction) {
    if (action.type === LIST_REMOVE) {
      return state.filter((list) => {
        if (list.listId !== action.payload.listId) return list;
      });
    } else if (action.type === LIST_ADD) {
      return action.payload.list ? [action.payload.list, ...state] : state;
    } else if (action.type === LIST_EDIT) {
      return state.map((list) => {
        if (!action.payload.list) return list;
        if (list.listId === action.payload.list.listId)
          list.name = action.payload.list.name;
        return list;
      });
    }

    fetch('http://localhost:8080/lists?user=' + action.payload.userId, {
      method: 'get',
      mode: 'cors',
    })
      .then((d) => d.text())
      .then((j) => {
        console.log(j);
      });
    return state;
  },
  addListFactory(listDispatch: React.Dispatch<ListAction>) {
    return useCallback(
      (newlist: string, userId: string) => {
        var new_list = {
          name: newlist,
          user: userId,
        };
        console.log(JSON.stringify(new_list));
        fetch('http://localhost:8080/addList', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(new_list),
        }).then((d) => {
          console.log(d.status);
          listDispatch({
            type: LIST_ADD,
            payload: {
              userId: userId,
              newlist: new_list,
            },
          });
        });
      },
      [listDispatch]
    );
  },
  removeListFactory(listDispatch: React.Dispatch<ListAction>) {
    return useCallback(
      (id: string, userId: string) => {
        listDispatch({
          type: LIST_REMOVE,
          payload: {
            userId: userId,
            listId: id,
          },
        });
      },
      [listDispatch]
    );
  },
  editListFactory(listDispatch: React.Dispatch<ListAction>) {
    return useCallback(
      (list: TaskList, userId: string) => {
        listDispatch({
          type: LIST_EDIT,
          payload: {
            userId: userId,
            list: list,
          },
        });
      },
      [listDispatch]
    );
  },
};
