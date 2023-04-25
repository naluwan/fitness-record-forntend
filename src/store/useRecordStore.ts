import { create } from 'zustand';
import type { Action } from 'actions';

import { setRecords } from '../actions';
import type { Record } from '../types';

const initialState = {
  records: [],
};

export type State = {
  records: Record[];
  onSetRecords: (records: Record[]) => void;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_RECORDS': {
      const records = action.payload;
      return {
        ...state,
        records,
      };
    }
    default:
      return state;
  }
};

const useRecordStore = create<State>((set) => {
  const dispatch = (action: Action) => {
    set((state) => {
      return reducer(state, action);
    });
  };
  return {
    ...initialState,
    dispatch,
    onSetRecords(records: Record[]) {
      dispatch(setRecords(records));
    },
  };
});

export default useRecordStore;
