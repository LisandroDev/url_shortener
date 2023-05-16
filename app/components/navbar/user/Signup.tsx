'use client'

import Modal from '../../Modal';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle} from 'react-icons/bs'


const SignUp = () => {
  return (
    <>
      <Modal
        title='Sign up'
        buttonLabel='Sign up'
        id='signup-modal'
        submittable={true}
        submitLabel='Sign up'
      >
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
            <input
              type='password'
              placeholder='Confirm Password'
              required={true}
              className='input input-bordered'
            />
          </div>
          <div className='divider mt-8 mb-8'>Or continue with</div>
          <div className='flex gap-x-4'>
          <AuthSocialButton icon={BsGithub} onClick={() => console.log('test')}/>
          <AuthSocialButton icon={BsGoogle} onClick={() => console.log('test')}/>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SignUp;
