import axios from 'axios';
import Cookies from 'js-cookie';
import type { Record, SportCategory } from 'types';
import Swal from 'sweetalert2';

const JWT_TOKEN = 'JWT_TOKEN';
const API_URL = 'http://192.168.0.144:3000';
// const API_URL = 'http://172.20.10.11:3000';
const axiosInstance = axios.create();

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

// 驗證token
export const getJWTToken = () => {
  return Cookies.get(JWT_TOKEN);
};

// 清除token
export const cleanToken = () => {
  Cookies.remove(JWT_TOKEN);
  delete axiosInstance.defaults.headers.authorization;
};

// 設定token
export const setToken = (token: string) => {
  Cookies.set(JWT_TOKEN, token);
  axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
};

// 驗證token
export const verifyToken = async (token: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/auth`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    cleanToken();
    return Promise.reject(err);
  }
};

type RecordsResponse = {
  records: Record[];
  sportCategories: SportCategory[];
  sportCategoryId: string;
  userId: string;
};

// 獲取記錄資訊
export const fetchRecords = async (): Promise<RecordsResponse> => {
  try {
    const { data } = await axios.get(`${API_URL}/records`);
    return data.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

type DeleteRecordResponse = {
  status: string;
  data: {
    deleteRecord: Record;
  };
};

export const deleteRecord = async (id: number): Promise<DeleteRecordResponse> => {
  // try {
  //   const { data } = await axiosInstance.delete(`${API_URL}/records/${id}`);
  //   return data;
  // } catch (err) {
  //   return Promise.reject(err);
  // }
  try {
    const { data } = await axios.delete(`${API_URL}/records/${id}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ik5hb21pIiwiZW1haWwiOiJuYW9taUBleGFtcGxlLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vaS5pbWd1ci5jb20vM204bE1wai5qcGVnIiwid2VpZ2h0Ijo2NSwid2Fpc3RsaW5lIjo1MCwibm93V2VpZ2h0IjpudWxsLCJub3dXYWlzdGxpbmUiOm51bGwsIndlaWdodERpZmYiOm51bGwsIndhaXN0bGluZURpZmYiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMTBUMTM6Mjc6NDguMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMTBUMTM6Mjc6NDguMDAwWiIsImlhdCI6MTY4MzcyNjMzMCwiZXhwIjoxNjgzNzU1MTMwfQ.l2WbWqRl673gpsK1W3V4SoABEBhWsbYcLcE7jOZM3ec',
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type RegisterInfo = {
  name: string;
  email: string;
  weight: number | null;
  waistline: number | null;
  password: string;
  passwordCheck: string;
  avatar: FileList | null;
};

export const fetchRegister = async (registerInfo: RegisterInfo) => {
  const formData = new FormData();

  Object.entries(registerInfo).forEach(([key, value]) => {
    // 判斷體重或腰圍是否有填寫，沒有的話就不用加到formData中
    if ((key === 'weight' || key === 'waistline') && value === null) return;

    // 將使用者頭像檔案加到formData中
    if (key === 'avatar' && value) {
      const files = value as FileList;
      formData.append(key, files[0]);
      return;
    }

    formData.append(key, value as string);
  });

  try {
    const res = await axios.post(`${API_URL}/signup`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
    Toast.fire({
      icon: 'success',
      title: '註冊成功',
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      Toast.fire({
        icon: 'error',
        title: '註冊失敗',
        text: err.response?.data.message,
      });
      return err.response?.data;
    }
    return err as Error;
  }
};
