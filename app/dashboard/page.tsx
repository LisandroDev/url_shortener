import Table from './components/table';
import Stats from './components/stats';

const Page = () => {
  return (
    <main className='flex flex-1 flex-col   gap-y-28 items-center py-12 sm:px-6 lg:px-8 base-100 '>
      <section>
        <Stats />
      </section>
      <section>
        <Table />
      </section>
    </main>
  );
};

export default Page;
