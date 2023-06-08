'use client';

import Modal from '@/app/components/Modal';
import { CountryViews, ShortURL } from '@prisma/client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { getFlagEmoji } from '@/app/utils/getFlagEmoji';

interface CountriesViewsProps {
  shortUrlId: ShortURL['id'];
}



const CountriesViews: React.FC<CountriesViewsProps> = ({ shortUrlId }) => {
  const [viewsPerCountry, setViewsPerCountry] = useState<CountryViews[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post('/api/dashboard/countriesviews', {
          data: { shortUrlId: shortUrlId },
        })
        .then((res) => {
          console.log(res.data);
          setViewsPerCountry(res.data.viewsPerCountry);
        })
        .catch((error) => console.log('fail on fetch'));
    };

    if(isOpen){
      fetchData();
    }
  }, [shortUrlId, isOpen]);

  return (
    <>
      <Modal
        title='Views per country'
        id='countriesviews-modal'
        buttonLabel='\uD83C\uDFF3'
        buttonClass='btn ml-4 btn-xs text-xs truncate hover:text-clip' 
        handleOpen={handleOpen}
      >
        <section className='flex flex-col mt-8 flex-wrap sm:flex-row gap-4 sm:gap-8 '>
          {viewsPerCountry &&
            viewsPerCountry.map((CountryViews: CountryViews) => (
              <p key={CountryViews.id} className='text-3xl'>
                {getFlagEmoji(CountryViews.country_name)}
                <span className="ml-4 text-center text-xl">
                {CountryViews.views}

                </span>
              </p>
              
            ))}
        </section>
      </Modal>
    </>
  );
};

export default CountriesViews;
