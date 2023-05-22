/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Record, SportCategory } from 'types';

type FRPostFormProps = {
  record: Record;
  sportCategories: SportCategory[];
};

const FRPostFrom: React.FC<FRPostFormProps> = (props) => {
  const { record, sportCategories } = props;
  return (
    <div className='lg:flex lg:items-start lg:justify-between'>
      {/* 預覽圖片 */}
      <div className='flex w-full items-center justify-center lg:w-[600px] lg:pr-6'>
        <img
          src='https://i.imgur.com/pMVVEhb.jpeg'
          alt='post-img'
          className='w-full object-contain'
        />
      </div>
      {/* 編輯資訊區 */}
      <div className='w-full lg:w-[424px]'>
        {/* 運動 select */}
        <div className='pb-2'>
          <label htmlFor='countries' className='mb-2 block text-sm font-medium text-gray-900'>
            運動
          </label>
          <select
            id='countries'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            defaultValue={record.SportCategory?.id}
          >
            <option value='' hidden disabled>
              選擇一個運動
            </option>
            {sportCategories?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* 體重 input */}
        <div className='pb-2'>
          <label htmlFor='first_name' className='mb-2 block text-sm font-medium text-gray-900'>
            體重
          </label>
          <input
            type='number'
            id='weight'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            defaultValue={record.weight}
            placeholder='請填入目前體重...'
            required
          />
        </div>

        {/* 腰圍 input */}
        <div className='pb-2'>
          <label htmlFor='first_name' className='mb-2 block text-sm font-medium text-gray-900'>
            腰圍
          </label>
          <input
            type='number'
            id='weight'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            defaultValue={record.waistline}
            placeholder='請填入目前腰圍...'
            required
          />
        </div>

        {/* 運動心得 textarea */}
        <div className='pb-2'>
          <label htmlFor='message' className='mb-2 block text-sm font-medium text-gray-900'>
            運動心得
          </label>
          <textarea
            id='message'
            rows={4}
            defaultValue={record.description}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='填寫今日運動心得....'
          />
        </div>
      </div>
    </div>
  );
};

export default FRPostFrom;
