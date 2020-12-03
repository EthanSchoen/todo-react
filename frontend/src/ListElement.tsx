import React, { useContext, useState } from 'react';
import { UserCode } from '.';
import { TaskList } from './types';

type Props = {
  list: TaskList;
  setList: Function;
  remove: Function;
  edit: Function;
};

const ListElement = ({
  list: taskList,
  setList: setCurrentList,
  remove: removeList,
  edit: editList,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [editedList, setEditedList] = useState(taskList.name);
  const doneEditing = () => {
    editList(
      {
        listId: taskList.listId,
        name: editedList,
        user: taskList.user,
      },
      setEdit
    );
    // setEdit(false);
  };
  return (
    <li className="list">
      {edit ? (
        // edit task
        <input
          className="editTask"
          type="text"
          defaultValue={taskList.name}
          onChange={(e) => setEditedList(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') doneEditing();
          }}
        />
      ) : (
        // display task
        <div className="listName" onClick={(_) => setCurrentList(taskList)}>
          {taskList.name}
        </div>
      )}
      <div className="menu">
        <input
          type="image"
          className="menu"
          src="https://www.flaticon.com/svg/static/icons/svg/2089/2089793.svg"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            className="dropdown-item"
            onClick={() => (edit ? doneEditing() : setEdit(true))}
          >
            {edit ? 'Done' : 'Edit'}
          </a>
          {edit ? (
            <a className="dropdown-item" onClick={() => setEdit(false)}>
              Cancel
            </a>
          ) : (
            ''
          )}
          <a className="dropdown-item" onClick={() => removeList(taskList)}>
            Remove
          </a>
        </div>
      </div>
    </li>
  );
};

export default ListElement;
