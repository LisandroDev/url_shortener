'use client'

import Modal from '../../Modal';
import {BsGithub , BsGoogle } from 'react-icons/bs'
import AuthSocialButton from './AuthSocialButton';

const Login = () => {


  return (
    <>
      <Modal
        title='Login'
        buttonLabel='Login'
        id='login-modal'
        submitLabel='Log in'
        submittable={true}
      >
        {' '}
        <form className='mt-8 w-full'>
          <div className='flex flex-col gap-8'>
            <input
              type='text'
              placeholder='Email'
              className='input input-bordered'
            />
            <input
              type='password'
              placeholder='Password'
              required={true}
              className='input input-bordered'
            />
          </div>
          <div className='divider mt-8 mb-8'>Or continue with</div>
          <div className='flex gap-x-4'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => console.log('test')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => console.log('test')}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Login;
