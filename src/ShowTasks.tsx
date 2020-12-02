import React from 'react';
import NewTask from './NewTask';
import TaskElement from './TaskElement';
import { Task } from './types';

type Props = {
  tasks: Task[];
  add: Function;
  toggle: Function;
  remove: Function;
  edit: Function;
};

const ShowTasks = ({
  tasks: tasks,
  add: addTask,
  toggle: toggleTask,
  remove: removeTask,
  edit: editTask,
}: Props) => {
  return (
    <div>
      <NewTask onSubmit={addTask} />
      <hr />
      <ul>
        {tasks.map((t) => (
          <TaskElement
            key={t.taskId}
            task={t}
            toggle={toggleTask}
            remove={removeTask}
            edit={editTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowTasks;
