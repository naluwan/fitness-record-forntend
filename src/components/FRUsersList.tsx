import React from 'react';
import { User } from 'types';
import FRUser from './FRUser';

type FRUsersListProps = {
  filteredUsers: User[];
  search: string;
};

const FRUsersList: React.FC<FRUsersListProps> = (props) => {
  const { filteredUsers, search } = props;
  const users = filteredUsers.map((user) => (
    <div key={user.id} className='rounded-lg hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
      <FRUser
        key={user.id}
        userId={user.id}
        size='medium'
        name={user.name}
        avatar={user.avatar}
        showFollow
      />
    </div>
  ));

  const content = filteredUsers?.length ? (
    <div className='w-full'>{users}</div>
  ) : (
    <article className='w-full'>
      <p className='break-all'>查無符合「{search}」的結果。</p>
    </article>
  );

  return content;
};

export default React.memo(FRUsersList);
