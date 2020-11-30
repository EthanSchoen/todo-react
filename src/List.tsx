import React from 'react';
import TaskElement from './TaskElement';
import { Task } from './types';

type Props = {
  tasks: Task[];
};

const List = (props: Props) => {
  return (
    <ul>
      {props.tasks.map((t) => (
        <TaskElement key={t.id} task={t} />
      ))}
    </ul>
  );
};

export default List;
