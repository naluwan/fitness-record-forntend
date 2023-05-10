import axios from 'axios';
import Cookies from 'js-cookie';
import type { Record, SportCategory } from 'types';

const JWT_TOKEN = 'JWT_TOKEN';
const API_URL = 'http://192.168.0.144:3000';
const axiosInstance = axios.create();

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
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ik5vbm5hIiwiZW1haWwiOiJub25uYUBleGFtcGxlLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vaS5pbWd1ci5jb20vNVFxN20xei5qcGVnIiwid2VpZ2h0Ijo2NSwid2Fpc3RsaW5lIjpudWxsLCJub3dXZWlnaHQiOjYyLjgsIm5vd1dhaXN0bGluZSI6bnVsbCwid2VpZ2h0RGlmZiI6LTMuMzgsIndhaXN0bGluZURpZmYiOjAsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMzBUMDY6MzE6NTguMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMDlUMDk6MDk6MDUuMDAwWiIsImlhdCI6MTY4MzY5ODY3OSwiZXhwIjoxNjgzNzI3NDc5fQ.mC8Hk0uO3yBJOGLwb-GQVQdmkj3RdRGrSpyHY9wUIIw',
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
