import React from 'react';
import TaskElement from './TaskElement';
import { Task } from './types';

type Props = {
  tasks: Task[];
  toggle: Function;
  remove: Function;
  edit: Function;
};

const List = ({
  tasks: taskArray,
  toggle: toggleTask,
  remove: removeTask,
  edit: editTask,
}: Props) => {
  return (
    <ul>
      {taskArray.map((t) => (
        <TaskElement
          key={t.id}
          task={t}
          toggle={toggleTask}
          remove={removeTask}
          edit={editTask}
        />
      ))}
    </ul>
  );
};

export default List;
