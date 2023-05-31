/* eslint-disable @next/next/no-img-element */

import { ShortURL } from '@prisma/client';

interface TableProps {
  urls: ShortURL[];
}

interface TableItemProps {
  url: ShortURL;
}

const TableItem: React.FC<TableItemProps> = ({ url }) => {
  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            <input type='checkbox' className='checkbox' />
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
        <td>{url.views}</td>
      </tr>
    </tbody>
  );
};

const Table: React.FC<TableProps> = ({ urls }) => {
  return (
    <div className='overflow-x-auto w-full px-4 '>
      <table className='table table-fixed w-full text-center'>
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
          <TableItem key={url.id} url={url} />
        ))}
        
      </table>
    </div>
  );
};

export default Table;
