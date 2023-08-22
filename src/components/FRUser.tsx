/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { fetchPutRecord, fetchRecord, RecordResponse } from 'services/apis';
import { Record } from 'types';
import { Confirm, Toast } from 'utils/swal';
import { Link } from 'react-router-dom';
import FRModal from './FRModal';
import FRPostFrom from './FRPostFrom';

type FRUserProps = {
  size?: 'medium' | 'small';
  name?: string;
  date?: string;
  showFollow?: boolean;
  isFollowing?: boolean;
  avatar?: string;
  userId?: number;
  recordId?: number;
  showMore?: boolean;
  target?: boolean;
  onRefetch?: () => void;
  onRefetchRank?: () => void;
  onCloseModal?: () => void;
};

const FRUser: React.FC<FRUserProps> = (props) => {
  const {
    size = 'small',
    name,
    date,
    showFollow,
    isFollowing,
    avatar,
    userId,
    recordId,
    target,
    showMore = false,
    onRefetch,
    onRefetchRank,
    onCloseModal,
  } = props;

  const [openPanel, setOpenPanel] = React.useState(false);

  const [editing, setEditing] = React.useState(false);
  const [editRecord, setEditRecord] = React.useState<RecordResponse | null>(null);
  const [newRecord, setNewRecord] = React.useState<Record | null>(null);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // 畫面點擊時，如果element沒有包含在popoverRef底下的話，就關閉panel
  window.addEventListener('mousedown', (e) => {
    if (
      panelRef.current &&
      buttonRef.current &&
      !panelRef.current.contains(e.target as HTMLElement) &&
      !buttonRef.current.contains(e.target as HTMLElement)
    ) {
      setOpenPanel(false);
    }
  });

  const { isFetching, socket, needUpdateRanking, onSetNeedUpdateRanking, onDeleteRecord } =
    useRecordStore((state) => {
      return {
        isFetching: state.isFetching,
        socket: state.socket,
        needUpdateRanking: state.needUpdateRanking,
        onSetNeedUpdateRanking: state.onSetNeedUpdateRanking,
        onDeleteRecord: state.onDeleteRecord,
      };
    }, shallow);

  // refetch all info and set need update ranking to false
  const refetchAll = React.useCallback(() => {
    if (typeof onRefetch === 'function') {
      onRefetch();
    }
    if (typeof onRefetchRank === 'function') {
      onRefetchRank();
    }
    onSetNeedUpdateRanking(false);
  }, [onRefetch, onRefetchRank, onSetNeedUpdateRanking]);

  // refetchAll when needUpdateRanking is true
  React.useEffect(() => {
    if (needUpdateRanking) {
      refetchAll();
    }
  }, [needUpdateRanking, refetchAll]);

  // 刪除記錄
  const atDeleteRecord = React.useCallback(
    (id: number) => {
      onDeleteRecord(id)
        .then(() => {
          setOpenPanel(false);
          if (typeof onCloseModal === 'function') {
            onCloseModal();
          }
          socket?.emit('updateRanking', true);
          Toast.fire({
            icon: 'success',
            title: '刪除記錄成功',
          });
        })
        .catch((err) => {
          console.log('err data ==> ', err);
          Toast.fire({
            icon: 'error',
            title: '刪除記錄失敗',
            text: err.response.data.message,
          });
        });
    },
    [onDeleteRecord, onCloseModal, socket],
  );

  // 顯示編輯紀錄modal和獲取該筆記錄資料
  const atEditRecord = React.useCallback((id: number) => {
    setEditing(true);
    fetchRecord(id)
      .then((res) => {
        setEditRecord(res);
        setNewRecord(res.record);
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: '獲取記錄資料失敗',
          text: err.response.data.message,
        });
      });
  }, []);

  // 確認關閉 和 關閉modal
  const atClickCloseBtn = React.useCallback(async () => {
    const beforeEdit = JSON.stringify(editRecord?.record);
    const afterEdit = JSON.stringify(newRecord);

    if (beforeEdit === afterEdit) {
      setEditing(false);
    } else {
      const res = await Confirm('取消編輯？', '如果離開，將不會更新你的記錄內容');
      if (res.isConfirmed) {
        setEditing(false);
        setNewRecord(editRecord?.record as Record);
      }
    }
  }, [editRecord, newRecord]);

  // 送出編輯紀錄
  const atSubmitEditRecord = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const beforeEdit = JSON.stringify(editRecord?.record);
      const afterEdit = JSON.stringify(newRecord);
      if (beforeEdit === afterEdit) {
        setEditing(false);
      } else {
        fetchPutRecord(newRecord as Record)
          .then((res) => {
            setEditing(false);
            setOpenPanel(false);
            socket?.emit('updateRanking', true);
            setNewRecord(null);
            Toast.fire({
              icon: 'success',
              title: '更新記錄成功',
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: '更新記錄失敗',
              text: err.response.data.message,
            });
          });
      }
    },
    [newRecord, editRecord, socket],
  );

  return (
    <div className='box-border flex h-[70px] items-center px-4'>
      <Link
        className={`${
          size === 'small' ? 'h-[40px] w-[40px]' : 'h-[60px] w-[60px]'
        } flex-shrink-0 overflow-hidden rounded-full`}
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        to={`/profile/${userId}`}
      />
      <div className='ml-4'>
        <Link className='text-sm font-bold' to={`/profile/${userId}`}>
          {name}
        </Link>
        <p className='text-xs text-gray-400'>{date}</p>
      </div>
      {showMore && (
        <div className='relative ml-auto'>
          <button onClick={() => setOpenPanel((prev) => !prev)} ref={buttonRef}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 hover:text-[#e6e6e6] dark:hover:text-gray-500'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </button>
        </div>
      )}
      {showFollow && (
        <button
          className={`${isFollowing ? 'text-gray-700' : 'text-blue-400'} ml-auto text-xs font-bold`}
        >
          {isFollowing ? '追蹤中' : '追蹤'}
        </button>
      )}
      {editRecord && newRecord && (
        <FRModal target open={editing} currentPage='edit' onClose={() => atClickCloseBtn()}>
          <FRPostFrom
            record={newRecord}
            onSetNewRecord={setNewRecord as (record: React.SetStateAction<Record>) => void}
            openModal={editing}
            currentPage='edit'
            sportCategories={editRecord.sportCategories}
            onSubmit={atSubmitEditRecord}
          />
        </FRModal>
      )}

      {/* more popover panel */}
      <FRModal
        currentPage='FRUser'
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        target={target}
      >
        {/* 編輯 */}
        <div className='border-b-2 border-[#262626] py-2 first:pt-4 last:pb-4'>
          <button
            className='flex w-full items-center'
            onClick={() => {
              setOpenPanel(false);
              atEditRecord(recordId as number);
            }}
          >
            <div className='flex-1'>
              <p className='mb-[1px] text-base text-white'>編輯記錄</p>
            </div>
          </button>
        </div>

        {/* 刪除 */}
        <div className='py-4 first:pb-2 last:pt-2'>
          <button
            className='flex w-full items-center'
            onClick={() => atDeleteRecord(recordId as number)}
            disabled={isFetching}
          >
            <div className='flex-1'>
              <p className='mb-[1px] text-base text-red-600'>刪除記錄</p>
            </div>
          </button>
        </div>
      </FRModal>
    </div>
  );
};

export default React.memo(FRUser);
