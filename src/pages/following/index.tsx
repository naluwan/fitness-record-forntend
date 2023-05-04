import React from 'react';
import FRHeader, { IRef } from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';

const Following: React.FC = () => {
  const { onSetOpenPanel } = useRecordStore((state) => {
    return {
      onSetOpenPanel: state.onSetOpenPanel,
    };
  }, shallow);

  // popover panel ref
  const panelRef = React.useRef<IRef>(null);

  // 畫面點擊時，如果element沒有包含在popoverRef底下的話，就關閉panel
  window.addEventListener('mousedown', (e) => {
    if (
      panelRef.current &&
      !panelRef.current.getDiv().contains(e.target as HTMLElement) &&
      !panelRef.current.getButton().contains(e.target as HTMLElement)
    ) {
      onSetOpenPanel(false);
    }
  });
  return (
    <>
      <FRHeader ref={panelRef} />
      <FRContainer>
        <div>following</div>
      </FRContainer>
    </>
  );
};

export default Following;
