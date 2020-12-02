import React from 'react';
import Button from 'react-bootstrap/esm/Button';

type Props = {
  setUser: Function;
};

const users = ['Bob', 'Billy', 'Bobbie', 'Bert'];

const Login = ({ setUser: setUserId }: Props) => {
  return (
    <div className="loginDropdown">
      <Button data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select User
      </Button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {users.map((user, index) => (
          <a
            className="dropdown-item"
            key={index}
            onClick={() => setUserId(index.toString())}
          >
            {user}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Login;
