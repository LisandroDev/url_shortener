'use client';

import Modal from '@/app/components/Modal';
import { CountryViews, ShortURL } from '@prisma/client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getFlagEmoji } from '@/app/utils/getFlagEmoji';

interface CountriesViewsProps {
  shortUrlId: ShortURL['id'];
  shortUrlAlias: ShortURL['alias'];
}

const CountriesViews: React.FC<CountriesViewsProps> = ({
  shortUrlId,
  shortUrlAlias,
}) => {
  const [viewsPerCountry, setViewsPerCountry] = useState<CountryViews[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      
      await axios
        .post('/api/dashboard/countriesviews', {
          data: { shortUrlId: shortUrlId },
        })
        .then((res) => {
          setIsLoading(false);
          if (res.data.viewsPerCountry.length > 0) {
            setViewsPerCountry(res.data.viewsPerCountry);
          }
        })
        .catch((error) =>
          toast.error('Failure occurred while fetching the data.')
        );
    };

    if (isOpen) {
      fetchData();
    }
  }, [shortUrlId, isOpen]);

  const CountriesViewsSection = () => {
    return (
      <section className='flex flex-col mt-8 flex-wrap sm:flex-row gap-4 sm:gap-8 '>
        {viewsPerCountry
          ? viewsPerCountry.map((CountryViews: CountryViews) => (
              <p
                key={CountryViews.id}
                className='text-2xl badge badge-outline p-4'
              >
                {getFlagEmoji(CountryViews.country_name)}
                <span className='ml-4 text-center text-xl'>
                  {CountryViews.views}
                </span>
              </p>
            ))
          : 'Sorry but no data can be retrieved for this specific alias.'}
      </section>
    );
  };

  return (
    <>
      <Modal
        title='Views per country'
        id={shortUrlAlias}
        buttonLabel='🚩'
        buttonClass='btn ml-4 btn-xs bg-base-200 btn-circle btn-outline text-xs truncate hover:text-clip'
        handleOpen={handleOpen}
      >
        {isLoading ? (
          <button className='btn loading btn-ghost'> Loading </button>
        ) : (
          CountriesViewsSection()
        )}
      </Modal>
    </>
  );
};

export default CountriesViews;
