/* eslint-disable @next/next/no-img-element */

'use client';

import { useState, useEffect } from 'react';
import { ShortURL } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-toastify';

interface TableProps {
  urls: ShortURL[];
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
        <td>{url.views}</td>
      </tr>
    </tbody>
  );
};

const Table: React.FC<TableProps> = ({ urls }) => {
  const [shortUrls, setShortUrls] = useState<ShortURL[]>([]);
  const [selectedUrlsId, setSelectedUrlsId] = useState<ShortURL['id'][]>([]);

  useEffect(() => {
    setShortUrls(urls);
  }, [urls]);

  const handleDelete = async () => {
    axios
      .post('/api/url/delete', { urlsToDelete: selectedUrlsId })
      .then(() => {
        const filteredShortUrls = shortUrls.filter((shortUrl) => !selectedUrlsId.includes(shortUrl.id))
        setShortUrls(filteredShortUrls)
      })
      .finally(() => setSelectedUrlsId([]))
      .catch((error) => toast.error(error));

  };

  const handleSelect = (isChecked: boolean, selectedId: ShortURL['id']) => {
    const copyOfArray = selectedUrlsId.slice();

    if (isChecked) {
      copyOfArray.push(selectedId);
      setSelectedUrlsId(copyOfArray);
    } else {
      const filteredArray = copyOfArray.filter(
        (ShortUrlId) => ShortUrlId != selectedId
      );
      setSelectedUrlsId(filteredArray);
    }
  };

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

        {shortUrls.map((url) => (
          <TableItem HandleSelect={handleSelect} key={url.id} url={url} />
        ))}
      </table>
      <div>
        <button onClick={() => handleDelete()} className='btn btn-info'>
          Delete all selected
        </button>
      </div>
    </div>
  );
};

export default Table;
