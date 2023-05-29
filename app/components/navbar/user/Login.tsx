'use client';

import Modal from '../../Modal';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import AuthSocialButton from './AuthSocialButton';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' }, reValidateMode: 'onChange'});

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(" Invalid Credentials !")
          return
        }

        if (callback?.ok) {
          toast.success("Log in successful")
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal
        title='Login'
        buttonLabel='Login'
        id='login-modal'
        submitLabel='Log in'
        submittable={true}
        handleClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {' '}
        <form className='mt-8 w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-8'>
            <input
              type='text'
              placeholder='Email'
              disabled={isLoading}
              {...register('email', { required: true, validate: {
                validEmail: (inputValue: string) => isEmail(inputValue)
              }})}
              className='input input-bordered'
            />
            <input
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}
              required={true}
              disabled={isLoading}
              className='input input-bordered'
            />
          </div>
          <div className='divider mt-8 mb-8'>Or continue with</div>
          <div className='flex gap-x-4'>
            <AuthSocialButton
              icon={BsGithub}
              disabled={isLoading}
              onClick={() => console.log('test')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              disabled={isLoading}
              onClick={() => console.log('test')}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Login;
