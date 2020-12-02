import React, { FormEvent, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { UserCode } from './index';

type Props = {
  onSubmit: Function;
};

const NewList = ({ onSubmit: addList }: Props) => {
  const [list, setList] = useState('');
  const user = useContext(UserCode);
  const handleChange = (event: FormEvent) => {
    event.preventDefault();
    console.log(list);
    if (list.trim() !== '') addList(list, user);
    setList('');
  };
  return (
    <form id="newtask" onSubmit={handleChange}>
      <input
        placeholder=" Add a New List"
        type="text"
        value={list}
        onChange={(event) => setList(event.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default NewList;
