/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Images, Record, SportCategory } from 'types';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateType, DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { useDropzone } from 'react-dropzone';
import FRSlides from './FRSlides';

type FRPostFormProps = {
  record: Record;
  sportCategories: SportCategory[];
  currentPage: 'edit' | 'post' | 'newPost';
  openModal: boolean;
  onSetNewRecord: (record: React.SetStateAction<Record>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FRPostFrom: React.FC<FRPostFormProps> = (props) => {
  const { record, sportCategories, currentPage, openModal, onSetNewRecord, onSubmit } = props;

  // record有更新，就更新記錄日期
  React.useEffect(() => {
    setDate({
      startDate: record.date as unknown as DateType,
      endDate: record.date as unknown as DateType,
    });
    if (!openModal) {
      setSelectedFiles(null);
    }
  }, [record, openModal]);

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

  const [selectedFiles, setSelectedFiles] = React.useState<
    { preview: string; name: string }[] | null
  >(null);

  // 拖拉檔案區域設定
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    // 當圖片被選取或拖拉進區塊的時候執行
    onDrop: (acceptedFile) => {
      // 設定預覽圖片檔案
      setSelectedFiles(
        acceptedFile.map((file, idx) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            // 設定照片排序
            order: idx,
          }),
        ),
      );

      onSetNewRecord((prev) => {
        return {
          ...prev,
          Images: acceptedFile as unknown as FileList,
        };
      });
    },
  });

  // 新增Record時，判斷使用者是否選取圖片，如果已經選取圖片，就顯示圖片預覽，否則顯示圖片上傳畫面
  const NewPostImagesBlock =
    selectedFiles && selectedFiles.length > 0 ? (
      <FRSlides
        images={selectedFiles as { preview: string; name: string }[]}
        currentPage={currentPage}
      />
    ) : (
      <div className='flex h-full w-full items-center justify-center py-4 lg:w-[600px] lg:py-0 lg:pr-6'>
        <div
          className='dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          {...getRootProps()}
        >
          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
            <svg
              aria-hidden='true'
              className='mb-3 h-10 w-10 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>點擊上傳頭像圖片</span> 或將圖片拖拉至此
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              使用者頭像 (如沒有上傳，將使用預設頭像)
            </p>
          </div>
          <input id='dropzone-file' type='file' className='hidden' {...getInputProps()} />
        </div>
      </div>
    );

  return (
    <div className='lg:flex lg:items-stretch lg:justify-between'>
      {/* 預覽圖片 */}
      <div className='w-full py-4 lg:min-w-[600px] lg:py-0 lg:pr-6'>
        {record.Images !== null && record.Images.length > 0 ? (
          <FRSlides images={record.Images as Images[]} currentPage={currentPage} />
        ) : (
          NewPostImagesBlock
        )}
      </div>
      {/* 編輯資訊區 */}
      <div className='flex w-full flex-col justify-between lg:w-[424px]'>
        <form onSubmit={(e) => onSubmit(e)}>
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
              <option value='0' hidden disabled>
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
              type='text'
              id='weight'
              name='weight'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              value={record.weight?.toString()}
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
              type='text'
              id='waistline'
              name='waistline'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              value={record.waistline?.toString()}
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
    </div>
  );
};

export default FRPostFrom;
