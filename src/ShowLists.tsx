import React from 'react';
import ListElement from './ListElement';
import NewList from './NewList';
import { TaskList } from './types';

type Props = {
  lists: TaskList[];
  set: Function;
  add: Function;
  remove: Function;
  edit: Function;
};

const ShowLists = ({
  lists: lists,
  set: setCurrentList,
  add: addList,
  remove: removeList,
  edit: editList,
}: Props) => {
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
