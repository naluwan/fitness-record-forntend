import React from 'react';

type FRHamburgerAnimatedProps = {
  open: boolean;
  onSetOpen: (open: React.SetStateAction<boolean>) => void;
};

const FRHamburgerAnimated: React.FC<FRHamburgerAnimatedProps> = (props) => {
  const { open, onSetOpen } = props;
  return (
    <button
      className='relative w-6 h-6 text-black bg-white rounded-sm focus:outline-none'
      onClick={() => onSetOpen((prev) => !prev)}
    >
      <span className='sr-only'>Open main menu</span>
      <div className='absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
        <span
          aria-hidden='true'
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? 'rotate-45' : '-translate-y-1.5'
          }`}
        />
        <span
          aria-hidden='true'
          className={`block absolute  h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open && 'opacity-0'
          }`}
        />
        <span
          aria-hidden='true'
          className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
            open ? '-rotate-45' : 'translate-y-1.5'
          }`}
        />
      </div>
    </button>
  );
};

export default FRHamburgerAnimated;
