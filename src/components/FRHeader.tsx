import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FRHeader: React.FC = () => {
  const go = useNavigate();
  return (
    <header className='sticky top-0 bg-white border-b-[1px] border-gray-300'>
      <div className='flex justify-between items-center h-[60px] px-2 box-border lg:max-w-[1024px] lg:mx-auto lg:px-0'>
        {/* left logo */}
        <Link className='flex items-center' to='/'>
          <div className='w-[48px] h-[48px] flex items-center mr-4'>
            <img src='images/logo.png' alt='logo' />
          </div>
          <h1 className='font-bold'>Fitness Record</h1>
        </Link>
        {/* right nav  */}
        <div className='flex items-center'>
          {/* home */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mr-4 cursor-pointer'
            onClick={() => go('/')}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>

          {/* following */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-4 cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            onClick={() => go('/following')}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default FRHeader;
