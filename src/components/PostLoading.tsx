import React from 'react';

const PostLoading: React.FC = () => {
  return (
    <div className='animate-pulse pb-4 shadow-xl dark:shadow-gray-400/40 lg:my-8'>
      {/* 上面使用者 */}
      <div className='mb-4 flex items-center px-4'>
        {/* 使用者頭像 */}
        <div className='mr-3 h-[40px] w-[40px] flex-shrink-0 overflow-hidden rounded-full bg-[#3a3b3c]' />
        {/* 使用者名稱和發佈時間 */}
        <div className='flex h-[50px] w-[200px] flex-wrap content-evenly'>
          <div className='h-[16px] w-[200px] rounded-full bg-[#3a3b3c]' />
          <div className='h-[12px] w-[100px] rounded-full bg-[#3a3b3c]' />
        </div>
      </div>
      {/* 中間圖片 */}
      <div className='mb-4 h-[490px] w-full bg-[#3a3b3c]' />
      {/* 下面文字 */}
      <div className='flex h-auto w-[200px] flex-wrap content-evenly px-4'>
        <div className='mb-2 h-[12px] w-[200px] rounded-full bg-[#3a3b3c]' />
        <div className='mb-2 h-[12px] w-[100px] rounded-full bg-[#3a3b3c]' />
        <div className='mb-2 h-[12px] w-[200px] rounded-full bg-[#3a3b3c]' />
        <div className='h-[12px] w-[100px] rounded-full bg-[#3a3b3c]' />
      </div>
    </div>
  );
};

export default PostLoading;
