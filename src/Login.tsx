import React from 'react';
import Button from 'react-bootstrap/esm/Button';

type Props = {
  setUser: Function;
};

const Login = ({ setUser: setUserId }: Props) => {
  return (
    <div className="loginDropdown">
      <Button data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select User
      </Button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" onClick={() => setUserId('1')}>
          user1
        </a>
        <a className="dropdown-item" onClick={() => setUserId('2')}>
          user2
        </a>
        <a className="dropdown-item" onClick={() => setUserId('3')}>
          user3
        </a>
      </div>
    </div>
  );
};

export default Login;
