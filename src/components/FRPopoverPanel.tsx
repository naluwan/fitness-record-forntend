import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';

type FRPopoverPanelProps = {
  children: React.ReactNode;
};

const FRPopoverPanel = React.forwardRef<HTMLDivElement, FRPopoverPanelProps>((props, ref) => {
  const { children } = props;

  const { openPanel } = useRecordStore((state) => {
    return {
      openPanel: state.openPanel,
    };
  }, shallow);

  return (
    <div
      className={`popover-panel duration-5000 transition ease-in-out ${
        openPanel ? 'block' : 'hidden'
      }`}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default FRPopoverPanel;
