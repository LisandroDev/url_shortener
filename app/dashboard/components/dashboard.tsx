'use client';

import Stats from './stats';
import Table from './table';
import { ShortURL } from '@prisma/client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Stats {
  views: number;
  totalUrls: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ views: 0, totalUrls: 0 });
  const [urls, setUrls] = useState<ShortURL[]>();
  const [selectedUrlsId, setSelectedUrlsId] = useState<ShortURL['id'][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/api/dashboard')
        .then((res) => {
          setIsLoading(true);
          res.data.stats
            ? setStats({
                totalUrls: res.data.stats.totalLinks,
                views: res.data.stats.totalViews.views,
              })
            : setStats({ views: 0, totalUrls: 0 });
          setUrls(res.data.urls);
        })
        .finally(() => setIsLoading(false))
        .catch((error) => {
          console.log(error);
          toast.error('Fail');
        });
    };
    fetchData();
  }, []);

  const updateStats = (shortUrls: ShortURL[]) => {
    const updatedTotalUrls = shortUrls.length;
    const updatedViews = shortUrls.reduce((prev, curr) => prev + curr.views, 0);
    setStats({ views: updatedViews, totalUrls: updatedTotalUrls });
  };

  const handleDelete = async () => {
    if (!urls) {
      return null;
    }

    if(urls.length === 0){
      return null;
    }

    axios
      .post('/api/url/delete', { urlsToDelete: selectedUrlsId })
      .then(() => {
        const filteredShortUrls = urls.filter(
          (shortUrl) => !selectedUrlsId.includes(shortUrl.id)
        );
        updateStats(filteredShortUrls);
        setUrls(filteredShortUrls);
      })
      .finally(() => {
        setSelectedUrlsId([]);
        toast.success('Short URLs deleted succesfully')
      })
      .catch((error) => toast.error('Error occurred during deletion. Please retry.'));
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

  if (!isLoading) {
    return (
      <>
        <section>
          <Stats totalUrls={stats.totalUrls} views={stats.views} />
        </section>
        <section>
          {urls ? (
            <Table
              urls={urls}
              handleDelete={handleDelete}
              handleSelect={handleSelect}
            />
          ) : (
            ''
          )}
        </section>
      </>
    );
  } else {
    return (
      <>
        <button className='btn btn-xs btn-primary loading'>Loading</button>
      </>
    );
  }
};

export default Dashboard;
