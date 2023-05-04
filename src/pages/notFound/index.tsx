import FRHeader from 'components/FRHeader';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <>
      <FRHeader />
      <h1 className='pt-6 text-center font-bold '>找不到頁面，請重新嘗試！</h1>
    </>
  );
};

export default NotFound;
