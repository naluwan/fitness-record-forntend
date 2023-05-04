import { create } from 'zustand';
import type { Action } from 'actions';

import { setRecords } from '../actions';
import type { Record, User } from '../types';

const initialState = {
  records: [],
  user: null,
  openPanel: false,
};

export type State = {
  records: Record[];
  user: User | null;
  openPanel: boolean;
  onSetRecords: (records: Record[]) => void;
  onSetOpenPanel: (openPanel: boolean) => void;
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
    onSetOpenPanel(open: boolean) {
      set({ openPanel: open });
    },
  };
});

export default useRecordStore;
