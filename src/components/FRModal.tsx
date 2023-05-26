import React from 'react';

type FRModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const FRModal: React.FC<FRModalProps> = (props) => {
  const { open, onClose, children } = props;

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        open ? 'visible bg-black/20 dark:bg-black/40' : 'invisible'
      }`}
      role='button'
      tabIndex={-1}
    >
      {/* modal */}
      <div
        className={`mt-[70px] h-[80%] w-full cursor-default overflow-auto rounded-lg bg-white p-6 transition-all duration-500 dark:bg-black lg:h-auto lg:w-[924px] ${
          open ? 'scale-100 opacity-100' : 'scale-125  opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
        role='contentinfo'
      >
        {/* 關閉 X按鈕 */}
        <button
          className='absolute right-1 top-2 rounded-full bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 lg:right-2'
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default FRModal;
