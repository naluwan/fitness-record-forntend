import React from 'react';

type FRCommentProps = {
  sportCategory: string;
  weight: number;
  waistline: number;
  description: string;
};

const FRComment: React.FC<FRCommentProps> = (props) => {
  const { sportCategory, weight, waistline, description } = props;
  return (
    <div className='p-4'>
      <p className='text-base'>
        <span className='font-bold inline-block mr-1'>運動：</span>
        <span>{sportCategory}</span>
      </p>
      <p className='text-base'>
        <span className=' font-bold inline-block mr-1'>體重：</span>
        <span>{weight}</span>
      </p>
      <p className='text-base'>
        <span className=' font-bold inline-block mr-1'>腰圍：</span>
        <span>{waistline}</span>
      </p>
      <p className='text-base'>
        <span className=' font-bold inline-block mr-1'>心得：</span>
        <span>{description}</span>
      </p>
    </div>
  );
};

export default React.memo(FRComment);
