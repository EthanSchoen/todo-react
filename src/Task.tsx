import React from 'react';
import TaskMenu from './TaskMenu';

const Task = () => {
  return (
    <li className="task">
      <input className="complete" type="checkbox" />
      <div> Task </div>
      <TaskMenu />
    </li>
  );
};

export default Task;
