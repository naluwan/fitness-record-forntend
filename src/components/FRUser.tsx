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
    <div className='box-border flex h-[70px] items-center px-4'>
      <div
        className={`${
          size === 'small' ? 'h-[40px] w-[40px]' : 'h-[60px] w-[60px]'
        } overflow-hidden rounded-full`}
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className='ml-4'>
        <p className='text-sm font-bold'>{name}</p>
        <p className='text-xs text-gray-400'>{date}</p>
      </div>
      {showFollow && (
        <p
          className={`${
            isFollowing ? 'text-gray-700' : 'text-blue-400'
          } ml-auto cursor-pointer text-xs font-bold`}
        >
          {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </p>
      )}
    </div>
  );
};

export default React.memo(FRUser);
