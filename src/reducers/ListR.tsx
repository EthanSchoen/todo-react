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
    listId?: string;
    list?: TaskList;
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
    return state;
  },
  addListFactory(listDispatch: React.Dispatch<ListAction>) {
    return useCallback(
      (newlist: string, userId: string) => {
        var new_list = {
          listId: uuid(),
          name: newlist,
          user: userId,
        };
        fetch('http://localhost:8080/addList', {
          method: 'post',
          body: JSON.stringify(new_list),
        })
          .then((d) => d.text())
          .then((j) => {
            listDispatch({
              type: LIST_ADD,
              payload: {
                list: new_list,
              },
            });
          });
      },
      [listDispatch]
    );
  },
  removeListFactory(listDispatch: React.Dispatch<ListAction>) {
    return useCallback(
      (id: string) => {
        listDispatch({
          type: LIST_REMOVE,
          payload: {
            listId: id,
          },
        });
      },
      [listDispatch]
    );
  },
  editListFactory(listDispatch: React.Dispatch<ListAction>) {
    return useCallback(
      (list: TaskList) => {
        listDispatch({
          type: LIST_EDIT,
          payload: {
            list: list,
          },
        });
      },
      [listDispatch]
    );
  },
};
