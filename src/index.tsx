import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TaskR from './api/TaskR';
import Login from './Login';
import ShowLists from './ShowLists';
import ShowTasks from './ShowTasks';
import { TaskList } from './types';

export const UserCode = React.createContext('');

const null_list = {
  listId: '-1',
  name: 'null',
  user: 'null',
} as TaskList;

const Application = () => {
  // const [tasks, taskDispatch] = useReducer(TaskR.reducer, []);
  const [userId, setUserId] = useState('');
  const [currentList, setCurrentList] = useState(null_list);

  // const updateTasks
  // const addTask = TaskR.addTaskFactory(taskDispatch);
  // const toggleTask = TaskR.toggleTaskFactory(taskDispatch);
  // const removeTask = TaskR.removeTaskFactory(taskDispatch);
  // const editTask = TaskR.editTaskFactory(taskDispatch);

  return (
    <UserCode.Provider value={userId}>
      <h1 className="mainHeader" onClick={(_) => setCurrentList(null_list)}>
        {currentList === null_list ? 'Things Todo' : currentList.name}
      </h1>
      {userId === '' ? (
        <Login setUser={setUserId} />
      ) : currentList === null_list ? (
        <ShowLists set={setCurrentList} />
      ) : (
        <ShowTasks
          list={currentList}
          // tasks={tasks}
          // add={addTask}
          // toggle={toggleTask}
          // remove={removeTask}
          // edit={editTask}
        />
      )}
    </UserCode.Provider>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
