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
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      } dark:bg-black/70`}
      role='button'
      tabIndex={-1}
    >
      {/* modal */}
      <div
        className={`mt-[70px] h-[80%] w-full cursor-default overflow-auto rounded-lg bg-white p-6 shadow-lg transition-all duration-500 lg:h-auto lg:w-[924px] ${
          open ? 'scale-100 opacity-100' : 'scale-125  opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
        role='contentinfo'
      >
        {children}
      </div>
    </div>
  );
};

export default FRModal;
