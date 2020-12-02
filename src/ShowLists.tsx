import React, { useContext, useReducer } from 'react';
import { UserCode } from '.';
import ListElement from './ListElement';
import NewList from './NewList';
import ListR from './reducers/ListR';
import { TaskList } from './types';

type Props = {
  set: Function;
};

// function addList(newlist: String, userId: String) {
//   fetch('http://localhost:8080/addList', {
//     method: 'post',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: newlist,
//       user: userId,
//     }),
//   }).then((d) => {
//     console.log(d.status);
//   });
// }

const ShowLists = ({ set: setCurrentList }: Props) => {
  const userId = useContext(UserCode);
  const [lists, listDispatch] = useReducer(ListR.reducer, []);

  const addList = ListR.addListFactory(listDispatch);
  const removeList = ListR.removeListFactory(listDispatch);
  const editList = ListR.editListFactory(listDispatch);

  // useEffect(() => {
  //   fetch('http://localhost:8080/lists?user=' + userId, {
  //     method: 'get',
  //     mode: 'cors',
  //   })
  //     .then((d) => d.text())
  //     .then((j) => {
  //       console.log(j);
  //     });
  // });

  return (
    <div>
      <NewList onSubmit={addList} />
      <hr />
      <ul>
        {lists.map((taskList) => (
          <ListElement
            key={taskList.listId}
            setList={setCurrentList}
            list={taskList}
            remove={removeList}
            edit={editList}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowLists;
