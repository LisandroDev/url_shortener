/* eslint-disable @next/next/no-img-element */

'use client';

import { ShortURL } from '@prisma/client';
import CountriesViews from './countriesviews';


interface TableProps {
  urls: ShortURL[];
  handleDelete: () => void;
  handleSelect: (isChecked: boolean, selectedId: ShortURL['id']) => void;
}

interface TableItemProps {
  url: ShortURL;
  HandleSelect: (isChecked: boolean, selectedId: ShortURL['id']) => void;
}

const TableItem: React.FC<TableItemProps> = ({ url, HandleSelect }) => {
  return (
    <tbody className='text-xs text-right sm:text-md sm:text-center'>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            <input
              onClick={(e) => HandleSelect(e.currentTarget.checked, url.id)}
              type='checkbox'
              className='checkbox'
            />
          </label>
        </th>
        <td>
          <div>
            <a
              href={`//${url.fullUrl}`}
              className='inline-block relative w-full whitespace-nowrap overflow-hidden text-ellipsis align-top hover:z-10 hover:w-auto hover:bg-base-200'
            >
              {url.fullUrl}
            </a>
          </div>
        </td>
        <td>
          <span className='font-bold'>{url.alias}</span>
        </td>
        <td className='text-center flex ml-4 items-center sm:inline-block'>
          {url.views}
          <CountriesViews shortUrlId={url.id} shortUrlAlias={url.alias} />
        </td>
      </tr>
    </tbody>
  );
};

const Table: React.FC<TableProps> = ({ urls, handleSelect, handleDelete}) => {

  return (
    <div className='overflow-x-auto w-full px-4 '>
      <table className='table table-xs table-fixed w-full text-center'>
        {/* head */}
        <thead>
          <tr>
            <th>
              <label></label>
            </th>
            <th>url</th>
            <th>Alias</th>
            <th>views</th>
            <th></th>
          </tr>
        </thead>

        {urls.map((url) => (
          <TableItem HandleSelect={handleSelect} key={url.id} url={url} />
        ))}
      </table>
      <div className='flex flex-col place-items-center mt-8'>
        <button onClick={() => handleDelete()} className='btn btn-info'>
          Delete all selected
        </button>
      </div>
    </div>
  );
};

export default Table;
