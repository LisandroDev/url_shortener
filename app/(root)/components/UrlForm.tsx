'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useBaseUrl from '../../hooks/useBaseUrl';
import isURL from 'validator/lib/isURL';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const UrlForm = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const baseUrl = useBaseUrl();
  const session = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { url: '', customAlias: null },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/url', data)
      .then((res) => {
        setNewUrl(res.data.shortUrl)
        if(!res.data.ownership){
          toast.info('The URL has already been shortened, and the ownership of this alias does not belong to you. To gain ownership, please create a custom alias.')
        }
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        toast.error(error.response.data)
      console.log(error)});
  };

  return (
    <section className='w-full flex flex-col gap-y-4  items-center py-12 md:px-24  rounded-md  bg-base-200 bg-opacity-75'>
      <form
        className='sm:ml-28 px-4 flex flex-col md:flex-row items-center gap-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register('url', {
              required: true,
              validate: {
                validUrl: (inputValue: string) => isURL(inputValue),
              },
            })}
            type='text'
            placeholder='Type your URL'
            className={`input input-bordered w-full ring-2 max-w-xs ${
              errors.url ? 'focus:ring-rose-500' : ''
            }`}
            disabled={isLoading}
          />
          {session?.status === 'authenticated' && <input  type='text'
            placeholder='Custom Alias'
            {...register('customAlias', {
              required: false
            })}
            className={`input input-bordered mt-8  h-10 w-32 ring-2 max-w-xs ${
              errors.url ? 'focus:ring-rose-500' : ''
            }`}
            disabled={isLoading}></input>}
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={`btn btn-sm btn-primary ml-4 ${
            isLoading ? 'loading' : ''
          } `}
        >
          {isLoading ? 'Loading' : 'Short Url !'}
        </button>
      </form>{' '}
      {newUrl && (
        <p className='text-md '>
          Short url generated:{' '}
          <a
            href={`${baseUrl + '/' + newUrl}`}
            className='ml-4 link link-success  font-bold'
          >{`${baseUrl + '/' + newUrl}`}</a>
        </p>
      )}
    </section>
  );
};

export default UrlForm;
