'use client';

import Login from './Login';
import { useSession } from 'next-auth/react';
import SignIn from './Signup';
import { signOut } from 'next-auth/react';
import Link from 'next/link';


const User = () => {
  const { data: session ,status } = useSession();
  
  switch(status){
    case 'loading':
      return (<button className="btn btn-ghost loading"></button>)
    case 'authenticated':
      return (
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img  referrerPolicy='no-referrer' src={session.user?.image || 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360'  }/>
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <Link href={'/dashboard'}>Dashboard</Link>
            </li>
  
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      );
    default:
      return (
        <>
          <Login />
          <SignIn />
        </>
      );
  }

};

export default User;
