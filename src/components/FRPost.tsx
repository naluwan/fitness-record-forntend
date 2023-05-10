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
  userId: number;
  recordId: number;
};

const FRPost: React.FC<FRPostProps> = (props) => {
  const {
    name,
    date,
    avatar,
    photo,
    sportCategory,
    weight,
    waistline,
    description,
    userId,
    recordId,
  } = props;

  return (
    <div className='pb-4 shadow-xl dark:shadow-gray-400/40 lg:my-8'>
      <FRUser
        name={name}
        date={date}
        avatar={avatar}
        userId={userId}
        recordId={recordId}
        showMore
      />
      <img src={photo} alt='post' className='max-h-[400px] w-full object-contain' />
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
