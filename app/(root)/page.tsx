import UrlForm from './components/UrlForm';
import Features from '../components/features/features';

const Page = () => {
  return (
    <main className='flex flex-1 flex-col   gap-y-28 items-center py-12 sm:px-6 lg:px-8 base-100 '>
      <UrlForm />
      <Features />
    </main>
  );
};

export default Page;
