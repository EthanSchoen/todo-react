import React from 'react';
import TaskMenu from './TaskMenu';
import { Task } from './types';

type Props = {
  task: Task;
};

const TaskElement = (props: Props) => {
  return (
    <li className="task">
      <input className="complete" type="checkbox" />
      <div>{props.task.taskString}</div>
      <TaskMenu />
    </li>
  );
};

export default TaskElement;
