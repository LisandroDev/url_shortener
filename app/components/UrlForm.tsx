'use client';

import axios from 'axios';
import isUrl from 'validator/lib/isURL';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const UrlForm = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div className='w-128 flex flex-col gap-y-4  items-center py-12 md:px-24  rounded-md bg-opacity-5 bg-slate-500'>
      <form
        className='flex flex-col md:flex-row items-center gap-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register('url', {
              required: true,
              validate: {
                validUrl: (inputValue: string) => isUrl(inputValue),
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
        <p className='text-md underline underline-offset-4'>{`Short url generated: ${newUrl}`}</p>
      )}
    </div>
  );
};

export default UrlForm;
