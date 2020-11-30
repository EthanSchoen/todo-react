import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';

type Props = {
  onSubmit: Function;
};

const NewTask = ({ onSubmit: addTask }: Props) => {
  const [task, setTask] = useState('');
  const handleChange = (event: FormEvent) => {
    event.preventDefault();
    addTask(task);
    setTask('');
  };
  return (
    <form id="newtask" onSubmit={handleChange}>
      <input
        placeholder=" Add a New Task"
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default NewTask;
