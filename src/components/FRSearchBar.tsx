import React from 'react';
import { User } from 'types';

type FRSearchBarProps = {
  users: User[];
  search: string;
  onSetSearch: (text: string) => void;
  onSetFilteredUsers: (users: User[]) => void;
};

const FRSearchBar: React.FC<FRSearchBarProps> = (props) => {
  const { users, search, onSetSearch, onSetFilteredUsers } = props;

  // 當搜尋文字改變，就執行
  React.useEffect(() => {
    // 如果搜尋框為空，就將filteredUsers設為空陣列
    if (search === '') {
      onSetFilteredUsers([]);
      return;
    }

    // 根據使用者的搜尋文字，去users中篩選出名字符合搜尋文字的使用者(全部轉小寫做搜尋)
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
    // 設定篩選後的使用者
    onSetFilteredUsers(filteredUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className='box-border flex w-[90%] flex-shrink items-center rounded-full bg-[#1c1c1c] px-3 py-2 lg:ml-4 lg:w-[480px]'>
      <input
        type='text'
        placeholder='搜尋'
        id='search'
        className='peer/search w-full border-transparent bg-transparent p-0 text-white focus:border-transparent focus:ring-0'
        autoComplete='off'
        value={search}
        onChange={(e) => onSetSearch(e.target.value)}
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='order-first mr-2 h-[18px] w-[18px] peer-focus/search:hidden'
        fill='none'
        viewBox='0 0 24 24'
        stroke='#9ba3af'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>

      <button
        className={`peer-focus/search:block ${!search && 'hidden'}`}
        onClick={() => onSetSearch('')}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='order-last h-5 w-5 rounded-full bg-[#9ba3af] p-1 text-black'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
    </div>
  );
};

export default React.memo(FRSearchBar);
