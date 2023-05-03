import React from 'react';

type FRHamburgerAnimatedProps = {
  open: boolean;
  onSetOpen: (open: React.SetStateAction<boolean>) => void;
};

const FRHamburgerAnimated: React.FC<FRHamburgerAnimatedProps> = (props) => {
  const { open, onSetOpen } = props;
  return (
    <button
      className='z-20 h-6 w-6 rounded-sm bg-transparent text-black focus:outline-none  dark:text-white'
      onClick={() => onSetOpen((prev) => !prev)}
    >
      <span className='sr-only'>Open main menu</span>
      <div className='absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform'>
        <span
          aria-hidden='true'
          className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            open ? 'rotate-45' : '-translate-y-1.5'
          }`}
        />
        <span
          aria-hidden='true'
          className={`absolute block  h-0.5 w-5 transform bg-current transition ease-in-out ${
            open && 'opacity-0 duration-500'
          }`}
        />
        <span
          aria-hidden='true'
          className={`absolute block  h-0.5 w-5 transform bg-current  transition duration-500 ease-in-out ${
            open ? '-rotate-45' : 'translate-y-1.5'
          }`}
        />
      </div>
    </button>
  );
};

export default FRHamburgerAnimated;
