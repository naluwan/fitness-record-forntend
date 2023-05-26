/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Record, SportCategory } from 'types';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateType, DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import FRSlides from './FRSlides';

type FRPostFormProps = {
  record: Record;
  sportCategories: SportCategory[];
  onSetNewRecord: (record: React.SetStateAction<Record>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FRPostFrom: React.FC<FRPostFormProps> = (props) => {
  const { record, sportCategories, onSetNewRecord, onSubmit } = props;

  // record有更新，就更新記錄日期
  React.useEffect(() => {
    setDate({
      startDate: record.date as unknown as DateType,
      endDate: record.date as unknown as DateType,
    });
  }, [record]);

  // update record info
  const atChangeRecord = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      let currentValue: string | number = value;
      if (name === 'weight' || name === 'waistline') {
        currentValue = Number(value);
      }
      onSetNewRecord((prev) => {
        return {
          ...prev,
          [name]: currentValue,
        };
      });
    },
    [onSetNewRecord],
  );

  // 記錄日期
  const [date, setDate] = React.useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  // 更新使用者選擇的日期
  const atChangeDate = React.useCallback(
    (selectedDate: DateValueType) => {
      setDate(selectedDate);
      onSetNewRecord((prev) => {
        return {
          ...prev,
          date: selectedDate?.startDate as string,
        };
      });
    },
    [onSetNewRecord],
  );

  return (
    <div className='lg:flex lg:items-stretch lg:justify-between'>
      {/* 預覽圖片 */}
      <div className='w-full py-4 lg:w-[600px] lg:py-0 lg:pr-6'>
        {/* <img
          src='https://i.imgur.com/pMVVEhb.jpeg'
          alt='post-img'
          className='w-full object-contain'
        /> */}
        <FRSlides images={record.Images} currentPage='edit' />
      </div>
      {/* 編輯資訊區 */}
      <form
        className='flex w-full flex-col justify-between lg:w-[424px]'
        onSubmit={(e) => onSubmit(e)}
      >
        {/* 時間 */}
        <div className='pb-2'>
          <label
            htmlFor='date'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            日期
          </label>
          <Datepicker
            inputClassName='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='請選擇日期...'
            toggleClassName='absolute top-[25%] right-2'
            asSingle
            useRange={false}
            value={date}
            onChange={atChangeDate}
          />
        </div>

        {/* 運動 select */}
        <div className='pb-2'>
          <label
            htmlFor='sportCategoryId'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            運動
          </label>
          <select
            id='sportCategoryId'
            name='sportCategoryId'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            value={record.sportCategoryId}
            onChange={(e) => atChangeRecord(e)}
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
          <label
            htmlFor='weight'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            體重
          </label>
          <input
            type='number'
            id='weight'
            name='weight'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            value={record.weight}
            placeholder='請填入目前體重...'
            onChange={(e) => atChangeRecord(e)}
            required
          />
        </div>

        {/* 腰圍 input */}
        <div className='pb-2'>
          <label
            htmlFor='waistline'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            腰圍
          </label>
          <input
            type='number'
            id='waistline'
            name='waistline'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            value={record.waistline}
            placeholder='請填入目前腰圍...'
            onChange={(e) => atChangeRecord(e)}
            required
          />
        </div>

        {/* 運動心得 textarea */}
        <div className='pb-2'>
          <label
            htmlFor='description'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            運動心得
          </label>
          <textarea
            id='description'
            name='description'
            rows={4}
            value={record.description}
            className='block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='填寫今日運動心得....'
            onChange={(e) => atChangeRecord(e)}
          />
        </div>

        {/* 儲存按鈕 */}
        <div className='flex justify-end pt-2'>
          <button className='rounded-lg border border-transparent bg-blue-500 px-4 py-2 transition-all hover:bg-blue-600 focus:ring-offset-2 active:outline-none active:ring-2 active:ring-blue-500 lg:bottom-5'>
            <p className='text-sm font-medium text-white'>儲存</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FRPostFrom;
