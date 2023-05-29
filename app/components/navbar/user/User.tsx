'use client';

import { useState } from 'react';
import Login from './Login';
import { useSession } from 'next-auth/react';
import SignIn from './Signup'
import { signOut } from 'next-auth/react';

const User = () => {
  const session = useSession();

  if (session?.status === 'authenticated') {
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
            <a onClick={() => signOut()}>Logout</a>
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
