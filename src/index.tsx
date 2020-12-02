import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ListR from './reducers/ListR';
import TaskR from './reducers/TaskR';
import Login from './Login';
import ShowLists from './ShowLists';
import ShowTasks from './ShowTasks';

export const UserCode = React.createContext('');

const Application = () => {
  const [tasks, taskDispatch] = useReducer(TaskR.reducer, []);
  const [taskLists, listDispatch] = useReducer(ListR.reducer, []);
  const [userId, setUserId] = useState('');
  const [currentList, setCurrentList] = useState('');

  const addTask = TaskR.addTaskFactory(taskDispatch);
  const toggleTask = TaskR.toggleTaskFactory(taskDispatch);
  const removeTask = TaskR.removeTaskFactory(taskDispatch);
  const editTask = TaskR.editTaskFactory(taskDispatch);
  const addList = ListR.addListFactory(listDispatch);
  const removeList = ListR.removeListFactory(listDispatch);
  const editList = ListR.editListFactory(listDispatch);

  return (
    <UserCode.Provider value={userId}>
      <h1 className="mainHeader" onClick={(_) => setCurrentList('')}>
        {currentList === '' ? 'Things Todo' : currentList}
      </h1>
      {userId !== '' ? (
        currentList === '' ? (
          <ShowLists
            lists={taskLists}
            set={setCurrentList}
            add={addList}
            remove={removeList}
            edit={editList}
          />
        ) : (
          <ShowTasks
            tasks={tasks}
            add={addTask}
            toggle={toggleTask}
            remove={removeTask}
            edit={editTask}
          />
        )
      ) : (
        <Login setUser={setUserId} />
      )}
    </UserCode.Provider>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
