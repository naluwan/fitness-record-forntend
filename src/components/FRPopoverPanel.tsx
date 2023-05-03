import React from 'react';

type FRPopoverPanelProps = {
  open: boolean;
  children: React.ReactNode;
};

const FRPopoverPanel: React.FC<FRPopoverPanelProps> = (props) => {
  const { open, children } = props;

  return (
    <div className={`popover-panel duration-5000 transition  ease-in-out ${open && 'opacity-100'}`}>
      {children}
    </div>
  );
};

export default FRPopoverPanel;
