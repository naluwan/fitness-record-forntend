import React from 'react';
import ReactDOM from 'react-dom';

type FRModalProps = {
  open: boolean;
  onClose: () => void;
  target?: boolean;
  currentPage?: 'edit' | 'post' | 'profilePost' | 'FRUser';
  children: React.ReactNode;
};

const FRModal: React.FC<FRModalProps> = (props) => {
  const { open, onClose, target, currentPage, children } = props;

  const setModalStyle =
    currentPage === 'FRUser'
      ? 'h-auto lg:w-[40%] bg-[#1c1c1c]'
      : 'lg:w-[924px] bg-white dark:bg-[#1c1c1c]';

  return target ? (
    ReactDOM.createPortal(
      // backdrop
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
          open ? 'visible bg-black/20 dark:bg-black/40' : 'invisible'
        }`}
        role='button'
        tabIndex={-1}
      >
        {/* 關閉 X按鈕 */}
        <button
          className={`absolute right-1 top-2 p-1 text-black duration-500 hover:scale-125 dark:text-white lg:right-2 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='h-8 w-8'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        {/* modal */}
        <div
          className={`no-scrollbar mt-[70px] h-[80%] w-full cursor-default overflow-auto rounded-lg transition-all duration-500 lg:h-auto  ${
            open ? `scale-100 opacity-100 ${setModalStyle}` : 'scale-125 opacity-0 lg:w-0'
          } ${(currentPage === 'edit' || currentPage === 'post') && 'p-6'}

        `}
          onClick={(e) => e.stopPropagation()}
          role='contentinfo'
        >
          {children}
        </div>
      </div>,
      document.body,
    ) // backdrop
  ) : (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        open ? 'visible bg-black/20 dark:bg-black/40' : 'invisible'
      }`}
      role='button'
      tabIndex={-1}
    >
      {/* 關閉 X按鈕 */}
      <button
        className={`absolute right-1 top-2 p-1 text-black duration-500 hover:scale-125 dark:text-white lg:right-2 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2.5}
          stroke='currentColor'
          className='h-8 w-8'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      {/* modal */}
      <div
        className={`mt-[70px] h-[80%] w-full cursor-default overflow-auto rounded-lg  transition-all duration-500 lg:h-auto ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        } ${(currentPage === 'edit' || currentPage === 'post') && 'p-6'}
        ${currentPage === 'FRUser' ? 'h-auto lg:w-[40%]' : 'lg:w-[924px]'}
        ${currentPage === 'FRUser' ? 'bg-[#1c1c1c]' : 'bg-white dark:bg-black'}
        `}
        onClick={(e) => e.stopPropagation()}
        role='contentinfo'
      >
        {children}
      </div>
    </div>
  );
};

export default FRModal;
