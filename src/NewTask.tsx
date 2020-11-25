import React from 'react';
import Button from 'react-bootstrap/Button';

const NewTask = () => {
  return (
    <div id="newtask">
      <input placeholder="input" type="text" />
      <Button>Add</Button>
    </div>
  );
};

export default NewTask;
