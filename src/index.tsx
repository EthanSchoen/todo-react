import React from 'react';
import ReactDOM from 'react-dom';
import NewTask from './newTask';
import List from './List';

const Application = () => (
  <div>
    <h1>Things todo</h1>
    <NewTask />
    <List />
  </div>
);

ReactDOM.render(<Application />, document.getElementById('root'));
