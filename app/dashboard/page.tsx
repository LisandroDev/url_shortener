import Table from './components/table';
import Stats from './components/stats';
import getStats from '../actions/getStats';
import getUrls from '../actions/getUrls';

const Page = async () => {
  const statsInfo = await getStats();
  const urlsArray = await getUrls();

  if (statsInfo && urlsArray) {
    return (
      <main className='flex flex-1 flex-col   gap-y-28 items-center py-12 sm:px-6 lg:px-8 base-100 '>
        <section>
          <Stats
            totalUrls={statsInfo?.totalLinks || 0}
            views={statsInfo?.totalViews.views || 0}
          />
        </section>
        <section>
          <Table urls={urlsArray} />
        </section>
      </main>
    );
  } else {
    return (
      <main>
        <p>Error</p>
      </main>
    );
  }
};

export default Page;
