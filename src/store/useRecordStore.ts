import { create } from 'zustand';
import type { Action } from 'actions';

import {
  fetchLogin,
  cleanToken,
  LoginResponseType,
  Toast,
} from 'services/apis';
import { setRecordsAction } from '../actions';
import type { Record, User } from '../types';

const initialState = {
  records: [],
  user: null,
  openPanel: false,
  isFetching: false,
};

export type State = {
  records: Record[];
  user: User | null;
  openPanel: boolean;
  isFetching: boolean;
  onSetRecords: (records: Record[]) => void;
  onSetOpenPanel: (openPanel: boolean) => void;
  onSetIsFetching: (isFetching: boolean) => void;
  onLogin: (email: string, password: string) => Promise<LoginResponseType>;
  onLogout: () => void;
  init: () => void;
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
      dispatch(setRecordsAction(records));
    },
    onSetOpenPanel(open: boolean) {
      set({ openPanel: open });
    },
    onSetIsFetching(isFetching: boolean) {
      set({ isFetching });
    },
    async onLogin(email: string, password: string) {
      set({ isFetching: true });
      try {
        const res = await fetchLogin(email, password);
        set({ user: res.user });
        return res;
      } finally {
        set({ isFetching: false });
      }
    },
    onLogout() {
      cleanToken();
      window.location.reload();
    },
  };
});

export default useRecordStore;
