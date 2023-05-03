import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import FRHamburgerAnimated from './FRHamburgerAnimated';
import FRPopoverPanel from './FRPopoverPanel';
import ToggleSwitch from './ToggleSwitch';

const FRHeader: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDark, setIsDark] = React.useState<boolean>(false);

  const { user } = useRecordStore((state) => {
    return {
      user: state.user,
    };
  }, shallow);

  console.log(user);

  const go = useNavigate();

  return (
    <header className='sticky top-0 border-b-[1px] border-gray-300 bg-white'>
      <div className='box-border flex h-[60px] items-center justify-between px-2 lg:mx-auto lg:max-w-[1024px] lg:px-0'>
        {/* left logo */}
        <Link className='flex items-center' to='/'>
          <div className='mr-4 flex h-[48px] w-[48px] items-center'>
            <img src='images/logo.png' alt='logo' />
          </div>
          <h1 className='font-bold'>Fitness Record</h1>
        </Link>
        {/* right nav  */}
        <div className='relative flex items-center'>
          {/* home */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-4 h-6 w-6 cursor-pointer'
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
            className='mr-4 h-6 w-6 cursor-pointer'
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

          {/* new post */}
          <svg
            aria-label='新貼文'
            className='mr-4 h-6 w-6 cursor-pointer'
            color='rgb(0, 0, 0)'
            fill='rgb(0, 0, 0)'
            height='24'
            role='img'
            viewBox='0 0 24 24'
            width='24'
          >
            <path
              d='M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
            <line
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              x1='6.545'
              x2='17.455'
              y1='12.001'
              y2='12.001'
            />
            <line
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              x1='12.003'
              x2='12.003'
              y1='6.545'
              y2='17.455'
            />
          </svg>

          {/* more actions */}
          <FRHamburgerAnimated open={open} onSetOpen={setOpen} />
          <FRPopoverPanel open={open}>
            <>
              {/* profile */}
              <div className='mb-2 flex cursor-pointer items-center rounded-lg p-2 hover:bg-[#e6e6e6]'>
                {/* left icon */}
                <div className='mr-3 h-[40px] w-[40px] overflow-hidden rounded-full'>
                  <img
                    src='https://i.imgur.com/sp1lzhg.jpeg'
                    alt='avatar'
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* right text */}
                <div className='flex-1'>
                  <p className='mb-[2px] text-base text-black'>NaLuWan</p>
                  <p className='hidden text-sm text-gray-400 lg:block'>查看你的個人檔案</p>
                </div>
              </div>

              {/* theme change */}
              <div className='mb-2 flex cursor-pointer items-center rounded-lg p-2 hover:bg-[#e6e6e6]'>
                {/* left icon */}
                <div className='bg-fb-input mr-2 flex items-center justify-center rounded-full p-2'>
                  {isDark ? (
                    <svg
                      aria-label='主題圖示'
                      className='x1lliihq x1n2onr6'
                      color='rgb(245, 245, 245)'
                      fill='rgb(245, 245, 245)'
                      height='24'
                      role='img'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <title>主題圖示</title>
                      <path d='M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z' />
                    </svg>
                  ) : (
                    <svg
                      aria-label='主題圖示'
                      className='x1lliihq x1n2onr6'
                      color='rgb(0, 0, 0)'
                      fill='rgb(0, 0, 0)'
                      height='24'
                      role='img'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <title>主題圖示</title>
                      <path d='M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z' />
                    </svg>
                  )}
                </div>

                {/* right text */}
                <div className='hidden flex-1 lg:block'>
                  <p className='mb-[2px] text-base text-black'>深色模式</p>
                </div>
                <ToggleSwitch onSetIsDark={setIsDark} isDark={isDark} />
              </div>

              {/* user logout */}
              <div className='mb-2 flex cursor-pointer items-center rounded-lg p-2 hover:bg-[#e6e6e6]'>
                {/* left icon */}
                <div className='bg-fb-input mr-2 flex items-center justify-center rounded-full p-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    stroke='black'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>
                </div>

                {/* right icon */}
                <div className='flex-1'>
                  <p className='mb-[2px] text-base text-black'>登出</p>
                </div>
              </div>
            </>
          </FRPopoverPanel>
        </div>
      </div>
    </header>
  );
};

export default FRHeader;
