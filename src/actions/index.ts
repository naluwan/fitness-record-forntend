import type { Record } from 'types';

export const setRecordsAction = (records: Record[]): Action => ({
  type: 'SET_RECORDS',
  payload: records,
});

export type Action = {
  type: 'SET_RECORDS';
  payload: Record[];
};
