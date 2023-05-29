'use client';

import Modal from '../../Modal';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then((response) => {
        if(response.data.error){
          throw new Error(response.data.error)
        };
      })
      .then(() =>
        signIn('credentials', {
          ...data,
          redirect: false,
        })
      )
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
          return
        }

        if (callback?.ok) {
          toast.success('Successful');
        }
      })
      .finally(() => setIsLoading(false))
      .catch( error => {
        toast.error(error.message)
        setIsLoading(false)
      });
  };

  const socialAction = (action: string) => {
    setIsLoading(true)

    signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.error) {
        toast.error(" Invalid Credentials !")
        return
      }

      if (callback?.ok && callback?.error) {
        toast.success("Log in successful")
      }
    })
    .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Modal
        title='Sign up'
        buttonLabel='Sign up'
        id='signup-modal'
        submittable={true}
        submitLabel='Sign up'
        handleClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <form className='mt-8 w-full'>
          <div className='flex flex-col gap-8'>
            <input
              disabled={isLoading}
              type='text'
              placeholder='Email'
              {...register('email', {
                required: true,
                validate: {
                  validEmail: (inputValue: string) => isEmail(inputValue),
                },
              })}
              className={`input input-bordered ${
                errors.email ? ' border-rose-600 focus:ring-rose-500' : ''
              }`}
            />
            <input
              type='password'
              disabled={isLoading}
              placeholder='Password'
              required={true}
              {...register('password', { required: true, minLength: 8, maxLength:16 })}
              className={`input input-bordered ${
                errors.password ? ' border-rose-600 focus:ring-rose-500' : ''
              }`
              }
            />
          </div>
          <div className='divider mt-8 mb-8'>Or continue with</div>
          <div className='flex gap-x-4'>
          <AuthSocialButton
              icon={BsGithub}
              disabled={isLoading}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              disabled={isLoading}
              onClick={() => socialAction('google')}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SignUp;
