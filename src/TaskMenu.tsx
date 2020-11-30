import React from 'react';

const TaskMenu = () => {
  return (
    <div className="menu">
      <input
        type="image"
        className="menu"
        src="https://www.flaticon.com/svg/static/icons/svg/2089/2089793.svg"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      />
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" onClick={() => console.log('1')}>
          Action
        </a>
        <a className="dropdown-item" onClick={() => console.log('2')}>
          Another action
        </a>
        <a className="dropdown-item" onClick={() => console.log('3')}>
          Something else here
        </a>
      </div>
    </div>
  );
};

export default TaskMenu;
