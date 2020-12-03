import React, { useContext, useEffect, useReducer, useState } from 'react';
import { UserCode } from '.';
import ListElement from './ListElement';
import NewList from './NewList';
import ListR from './api/ListR';
import { TaskList } from './types';

type Props = {
  set: Function;
};

const ShowLists = ({ set: setCurrentList }: Props) => {
  const userId = useContext(UserCode);
  const [lists, setLists] = useState([] as TaskList[]);

  const addList = ListR.addListFactory(setLists, userId);
  const removeList = ListR.removeListFactory(setLists);
  const editList = ListR.editListFactory(setLists);
  useEffect(() => {
    ListR.getLists(setLists, userId);
  }, []);

  return (
    <div>
      <NewList onSubmit={addList} />
      <hr />
      <ul>
        {lists.map((taskList) => (
          <ListElement
            key={taskList.listId}
            setList={setCurrentList}
            list={taskList}
            remove={removeList}
            edit={editList}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowLists;
