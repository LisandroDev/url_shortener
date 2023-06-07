interface StatsProps {
  views: number;
  totalUrls: number;
}

const Stats: React.FC<StatsProps> = ({ views, totalUrls }) => {
  return (
    <div className='stats stats-vertical sm:stats-horizontal bg-base-200 shadow'>
      <div className='stat '>
        <div className='stat-figure text-primary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-8 h-8 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
        </div>
        <div className='stat-title'>Total views</div>
        <div className='stat-value'>{views}</div>
      </div>

      <div className='stat'>
        <div className='stat-figure text-secondary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-8 h-8 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            ></path>
          </svg>
        </div>
        <div className='stat-title'>Total ShortURL Links</div>
        <div className='stat-value'>{totalUrls}</div>
      </div>
    </div>
  );
};

export default Stats;
