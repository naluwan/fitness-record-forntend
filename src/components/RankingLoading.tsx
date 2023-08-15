import React from 'react';

const RankingLoading: React.FC = (props) => {
  return (
    <div className='mb-3 flex animate-pulse items-center'>
      {/* 排名圖片 */}
      <div className='mr-3 flex h-[60px] w-[60px] rounded-full bg-[#3a3b3c]' />
      {/* 使用者 */}
      <div className='flex grow items-center'>
        <div className='flex flex-1 items-center'>
          {/* 使用者頭像 */}
          <div className='mr-3 h-[40px] w-[40px] flex-shrink-0 overflow-hidden rounded-full bg-[#3a3b3c]' />
          {/* 使用者名稱 */}
          <div className='h-[16px] w-[85px] rounded-full bg-[#3a3b3c]' />
        </div>
        {/* 數值變化 */}
        <span className='flex-1'>
          {/* 目前數值 */}
          <div className='mb-2 h-[12px] w-[100px] rounded-full bg-[#3a3b3c]' />
          {/* 成果數值 */}
          <div className='h-[16px] w-[50px] rounded-full bg-[#3a3b3c]' />
        </span>
      </div>
    </div>
  );
};

export default RankingLoading;
