import { create } from 'zustand';
import type { Action } from 'actions';

import {
  fetchLogin,
  cleanToken,
  LoginResponseType,
  getJWTToken,
  verifyToken,
  Toast,
} from 'services/apis';

import { setRecordsAction } from '../actions';
import type { Record, User } from '../types';

const initialState = {
  records: [],
  user: null,
  openPanel: false,
  isDark: false,
  isFetching: false,
  isAppInitializedComplete: false,
};

export type State = {
  records: Record[];
  user: User | null;
  openPanel: boolean;
  isDark: boolean;
  isFetching: boolean;
  isAppInitializedComplete: boolean;
  onSetRecords: (records: Record[]) => void;
  onSetOpenPanel: (openPanel: boolean) => void;
  onSetIsFetching: (isFetching: boolean) => void;
  onLogin: (email: string, password: string) => Promise<LoginResponseType>;
  onLogout: () => void;
  init: () => void;
  onSetIsDark: (isDark: boolean) => void;
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
    init() {
      const token = getJWTToken();
      if (token) {
        verifyToken(token)
          .then((res) => {
            set({
              user: res.user,
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: '驗證錯誤',
              text: err.message,
            });
          })
          .finally(() => {
            set({
              isAppInitializedComplete: true,
            });
          });
      } else {
        set({
          isAppInitializedComplete: true,
        });
      }
    },
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
    onSetIsDark(isDark: boolean) {
      set({ isDark });
      localStorage.setItem('isDark', `${isDark}`);
    },
  };
});

export default useRecordStore;
