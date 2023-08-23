import { create } from 'zustand';
import type { Action } from 'actions';

import {
  fetchLogin,
  cleanToken,
  LoginResponseType,
  getJWTToken,
  verifyToken,
  RegisterInfoType,
  fetchRegister,
  RegisterResponseType,
  DeleteRecordResponse,
  fetchDeleteRecord,
  fetchLineLogin,
  IdTokenType,
} from 'services/apis';

import axios from 'axios';
import { Toast } from 'utils/swal';
import { Socket } from 'socket.io-client';
import { setRecordsAction } from '../actions';
import type { Record, User } from '../types';

const initialState = {
  records: [],
  user: null,
  openPanel: false,
  isDark: false,
  isFetching: false,
  isAppInitializedComplete: false,
  needUpdateRanking: false,
  socket: undefined,
  loginByLine: false,
  isNewUser: false,
};

export type State = {
  records: Record[];
  user: User | null;
  openPanel: boolean;
  isDark: boolean;
  isFetching: boolean;
  isAppInitializedComplete: boolean;
  needUpdateRanking: boolean;
  socket: Socket | undefined;
  loginByLine: boolean;
  isNewUser: boolean;
  onSetRecords: (records: Record[]) => void;
  onSetOpenPanel: (openPanel: boolean) => void;
  onSetIsFetching: (isFetching: boolean) => void;
  onLogin: (email: string, password: string) => Promise<LoginResponseType>;
  onRegister: (registerInfo: RegisterInfoType) => Promise<RegisterResponseType>;
  onLogout: () => void;
  init: () => void;
  onSetIsDark: (isDark: boolean) => void;
  onDeleteRecord: (id: number) => Promise<DeleteRecordResponse>;
  onLineLogin: (idToken: IdTokenType) => Promise<LoginResponseType>;
  onSetNeedUpdateRanking: (needUpdate: boolean) => void;
  onSetSocket: (socket: Socket) => void;
  onSetLoginByLine: (loginByLine: boolean) => void;
  onSetIsNewUser: (isNewUser: boolean) => void;
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
              text: '登入逾時，請重新登入',
            });
            set({ user: null, isAppInitializedComplete: true });
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
    async onRegister(registerInfo: RegisterInfoType) {
      set({ isFetching: true });
      try {
        const res = await fetchRegister(registerInfo);
        return res;
      } finally {
        set({ isFetching: false });
      }
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
    async onLineLogin(idToken: IdTokenType) {
      set({ isFetching: true });
      try {
        const res = await fetchLineLogin(idToken);
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
    async onDeleteRecord(id: number) {
      set({ isFetching: true });
      try {
        const res = await fetchDeleteRecord(id);
        return res;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // token過期，直接將user設為空並reload頁面
          if (err.response?.status === 401) {
            set({ user: null });
            window.location.reload();
          }
        }
        // 一般錯誤，如找不到記錄等...
        return Promise.reject(err);
      } finally {
        set({ isFetching: false });
      }
    },
    onSetNeedUpdateRanking(needUpdate: boolean) {
      set({ needUpdateRanking: needUpdate });
    },
    onSetSocket(socket: Socket) {
      set({ socket });
    },
    onSetLoginByLine(loginByLine: boolean) {
      set({ loginByLine });
    },
    onSetIsNewUser(isNewUser: boolean) {
      set({ isNewUser });
    },
  };
});

export default useRecordStore;
