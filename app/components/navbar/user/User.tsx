'use client';

import { useState } from 'react';
import Login from './Login';
import SignIn from './Signup'

const User = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  if (isAuthenticated === true) {
    return (
      <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img src='https://img.freepik.com/free-icon/user_318-563642.jpg?w=360' />
          </div>
        </label>
        <ul
          tabIndex={0}
          className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
        >
          <li>
            <a className='justify-between'>
              Profile
              <span className='badge'>New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <>
        <Login />
        <SignIn />
      </>
    );
  }
};

export default User;