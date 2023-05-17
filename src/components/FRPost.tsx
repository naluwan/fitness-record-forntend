import React from 'react';
import FRComment from './FRComment';
import FRUser from './FRUser';

type FRPostProps = {
  postUserName: string;
  date: string;
  postUserAvatar: string;
  photo: string;
  sportCategory: string;
  weight: number;
  waistline: number;
  description: string;
  postUserId: number;
  postRecordId: number;
  currentUserId: number | null;
  onRefetch: () => void;
};

const FRPost: React.FC<FRPostProps> = (props) => {
  const {
    postUserName,
    date,
    postUserAvatar,
    photo,
    sportCategory,
    weight,
    waistline,
    description,
    postUserId,
    postRecordId,
    currentUserId,
    onRefetch,
  } = props;

  return (
    <div className='pb-4 shadow-xl dark:shadow-gray-400/40 lg:my-8'>
      <FRUser
        name={postUserName}
        date={date}
        avatar={postUserAvatar}
        userId={postUserId}
        recordId={postRecordId}
        showMore={currentUserId === postUserId}
        onRefetch={onRefetch}
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
