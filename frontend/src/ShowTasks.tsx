import React, { useEffect, useState } from 'react';
import TaskR from './api/TaskR';
import NewTask from './NewTask';
import TaskElement from './TaskElement';
import { Task, TaskList } from './types';

type Props = {
  list: TaskList;
};

const ShowTasks = ({ list: list }: Props) => {
  const [tasks, setTasks] = useState([] as Task[]);

  const addTask = TaskR.addTaskFactory(setTasks, list);
  const toggleTask = TaskR.toggleTaskFactory(setTasks, list);
  const removeTask = TaskR.removeTaskFactory(setTasks, list);
  const editTask = TaskR.editTaskFactory(setTasks, list);
  useEffect(() => {
    TaskR.getTasks(setTasks, list);
  }, []);

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
