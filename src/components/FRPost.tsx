import React from 'react';
import FRComment from './FRComment';
import FRUser from './FRUser';

type FRPostProps = {
  name: string;
  date: string;
  avatar: string;
  photo: string;
  sportCategory: string;
  weight: number;
  waistline: number;
  description: string;
};

const FRPost: React.FC<FRPostProps> = (props) => {
  const { name, date, avatar, photo, sportCategory, weight, waistline, description } = props;

  return (
    <div className='shadow-md pb-4 lg:my-8'>
      <FRUser name={name} date={date} avatar={avatar} />
      <img src={photo} alt='post' className='w-full' />
      <FRComment
        sportCategory={sportCategory}
        weight={weight}
        waistline={waistline}
        description={description}
      />
    </div>
  );
};

export default React.memo(FRPost);
