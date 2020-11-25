import React from 'react';
import ReactDOM from 'react-dom';
import NewTask from './NewTask';
import List from './List';
import 'bootstrap/dist/css/bootstrap.min.css';

const Application = () => (
  <div>
    <h1>Things todo</h1>
    <NewTask />
    <hr />
    <List />
  </div>
);

ReactDOM.render(<Application />, document.getElementById('root'));
