
import Dashboard from './components/dashboard';

const Page = async () => {
    return (
      <main className='flex flex-1 flex-col   gap-y-28 items-center py-12 sm:px-6 lg:px-8 base-100 '>
        <Dashboard />
      </main>
    );
};

export default Page;
