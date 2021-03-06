import React, { useState } from 'react';
import { Task } from './types';

type Props = {
  task: Task;
  toggle: Function;
  remove: Function;
  edit: Function;
};

const TaskElement = ({
  task: taskObj,
  toggle: toggleTask,
  remove: removeTask,
  edit: editTask,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(taskObj.task);
  const doneEditing = () => {
    editTask({
      taskId: taskObj.taskId,
      complete: taskObj.complete,
      task: editedTask,
    });
    setEdit(false);
  };
  return (
    <li className="task">
      <input
        className="complete"
        type="checkbox"
        checked={taskObj.complete}
        onChange={(_) => toggleTask(taskObj)}
      />
      {edit ? (
        // edit task
        <input
          className="editTask"
          type="text"
          defaultValue={taskObj.task}
          onChange={(e) => setEditedTask(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') doneEditing();
          }}
        />
      ) : (
        // display task
        <div className={taskObj.complete ? 'strike' : ''}>{taskObj.task}</div>
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
          <a className="dropdown-item" onClick={() => removeTask(taskObj)}>
            Remove
          </a>
        </div>
      </div>
    </li>
  );
};

export default TaskElement;
