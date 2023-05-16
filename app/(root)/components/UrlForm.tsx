'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useBaseUrl from '../../hooks/useBaseUrl';
import isURL from 'validator/lib/isURL';

const UrlForm = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const baseUrl = useBaseUrl();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { url: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/url', data)
      .then((res) => setNewUrl(res.data.shortUrl))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='w-full flex flex-col gap-y-4  items-center py-12 md:px-24  rounded-md  bg-base-200 bg-opacity-75'>
      <form
        className='flex flex-col md:flex-row items-center gap-y-4'
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
    </div>
  );
};

export default UrlForm;
