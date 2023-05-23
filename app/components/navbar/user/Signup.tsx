'use client'

import Modal from '../../Modal';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import {BsGithub, BsGoogle} from 'react-icons/bs'
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';



const SignUp = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post('/api/register', data)
    .then(() => signIn('credentials', {
      ...data,
      redirect:false
    }))
    .then((callback) => {
      if (callback?.error){
        console.log('Invalid Credentials')
      }
      
    })
    .finally(() => setIsLoading(false))
  };



  return (
    <>
      <Modal
        title='Sign up'
        buttonLabel='Sign up'
        id='signup-modal'
        submittable={true}
        submitLabel='Sign up'
        handleClick={handleSubmit(onSubmit)}
      >
        <form className='mt-8 w-full'>
          <div className='flex flex-col gap-8'>
            <input
              type='text'
              placeholder='Email'
              {...register('email', { required: true })}
              className='input input-bordered'
            />
            <input
              type='password'
              placeholder='Password'
              required={true}
              {...register('password', { required: true })}
              className='input input-bordered'
            />
            <input
              type='password'
              placeholder='Confirm Password'
              required={true}
              {...register('password', { required: true })}
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
