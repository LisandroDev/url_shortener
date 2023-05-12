"use client";
import { SyntheticEvent } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import isUrl from "validator/lib/isURL";

const UrlForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onSubmit',reValidateMode: 'onSubmit',defaultValues: { url: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };


  return (
    <div className="w-128 flex flex-col gap-y-4 md:flex-row items-center py-12 md:px-24  rounded-md">
      <form
        className="flex flex-col md:flex-row items-center gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
        <input
          {...register("url", {required:true,
            validate: {
              validUrl: (inputValue: string) => isUrl(inputValue) 
            },
          })}
          type="text"
          placeholder="Type your URL"
          className={`input input-bordered w-full ring-2 max-w-xs ${errors.url ? 'focus:ring-rose-500' : ''}`}
        />
        </div>


        <button type="submit" className="btn btn-sm btn-primary ml-4">
          {" "}
          Short Url !{" "}
        </button>
      </form>{" "}
    </div>
  );
};

export default UrlForm;
