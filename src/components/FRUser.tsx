import React from 'react';

type FRUserProps = {
  size?: 'medium' | 'small';
  name?: string;
  date?: string;
  showFollow?: boolean;
  isFollowing?: boolean;
  avatar?: string;
  id?: number;
};

const FRUser: React.FC<FRUserProps> = (props) => {
  const { size = 'small', name, date, showFollow, isFollowing, avatar, id } = props;

  // TODO: user id
  console.log('user id ==> ', id);

  return (
    <div className='flex items-center box-border px-4 h-[70px]'>
      <div
        className={`${
          size === 'small' ? 'w-[40px] h-[40px]' : 'w-[60px] h-[60px]'
        } overflow-hidden rounded-full`}
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className='ml-4'>
        <p className='font-bold text-sm'>{name}</p>
        <p className='text-gray-400 text-xs'>{date}</p>
      </div>
      {showFollow && (
        <p
          className={`${
            isFollowing ? 'text-gray-700' : 'text-blue-400'
          } ml-auto text-xs font-bold cursor-pointer`}
        >
          {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </p>
      )}
    </div>
  );
};

export default React.memo(FRUser);
