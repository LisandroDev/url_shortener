'use client';

import Modal from '@/app/components/Modal';
import { CountryViews, ShortURL } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getFlagEmoji } from '@/app/utils/getFlagEmoji';

interface CountriesViewsProps {
  shortUrlId: ShortURL['id'];
}
// 179.41.138.56
const CountriesViews: React.FC<CountriesViewsProps> = ({ shortUrlId }) => {
  const [viewsPerCountry, setViewsPerCountry] = useState<CountryViews[]>();

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

    fetchData();
  }, [shortUrlId]);

  return (
    <>
      <Modal
        title='Views per country'
        id='countriesviews-modal'
        buttonLabel='See views per country'
      >
        <div>
          {viewsPerCountry &&
            viewsPerCountry.map((CountryViews: CountryViews) => (
              <p key={CountryViews.id}>
                {getFlagEmoji(CountryViews.country_name)}
                {CountryViews.views}
              </p>
            ))}
        </div>
      </Modal>
    </>
  );
};

export default CountriesViews;
