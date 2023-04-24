/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import FRHeader from 'components/FRHeader';
import FRContainer from 'components/FRContainer';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { fetchRecords } from 'services/apis';

const Home: React.FC = () => {
  const { onSetRecords } = useRecordStore((state) => {
    return {
      onSetRecords: state.onSetRecords,
    };
  }, shallow);

  const { data, isSuccess, isLoading, isError } = useQuery('allRecords', fetchRecords);

  React.useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      console.log(data);
    }
  });

  return (
    <>
      <FRHeader />
      <FRContainer>
        <div className='flex lg:justify-center'>
          {/* left */}
          <div className='w-full lg:w-[600px]'>記錄</div>
          {/* right */}
          <div className='hidden lg:block lg:w-[424px]'>排行榜</div>
        </div>
      </FRContainer>
    </>
  );
};

export default Home;
