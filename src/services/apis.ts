import axios from 'axios';
import Cookies from 'js-cookie';
import type { Record, SportCategory, User } from 'types';

const JWT_TOKEN = 'JWT_TOKEN';
const API_URL = 'http://192.168.0.144:3000';
// const API_URL = 'http://172.20.10.11:3000';
// const API_URL = 'http://10.0.0.192:3000';
const axiosInstance = axios.create();

// 獲取token
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
export const verifyToken = async (token: string): Promise<LoginResponseType> => {
  try {
    const { data } = await axios.get(`${API_URL}/auth`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
    return data.data;
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

// get records
export const fetchRecords = async (): Promise<RecordsResponse> => {
  try {
    const { data } = await axios.get(`${API_URL}/records`);
    return data.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type RecordResponse = {
  record: Record;
  sportCategories: SportCategory[];
};

// get record for edit component
export const fetchRecord = async (id: number): Promise<RecordResponse> => {
  try {
    const { data } = await axiosInstance.get(`${API_URL}/records/${id}/edit`);
    return data.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

type RankUsersResponse = {
  users: User[];
};

// get weight rank
export const fetchWeightRankUsers = async (): Promise<RankUsersResponse> => {
  try {
    const { data } = await axios.get(`${API_URL}/rank/weight`);
    return data.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// get waistline rank
export const fetchWaistlineRankUsers = async (): Promise<RankUsersResponse> => {
  try {
    const { data } = await axios.get(`${API_URL}/rank/waistline`);
    return data.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type DeleteRecordResponse = {
  status: string;
  data: {
    deleteRecord: Record;
  };
};

// delete record
export const fetchDeleteRecord = async (id: number): Promise<DeleteRecordResponse> => {
  try {
    const { data } = await axiosInstance.delete(`${API_URL}/records/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type RegisterInfoType = {
  name: string;
  email: string;
  weight: number | null;
  waistline: number | null;
  password: string;
  passwordCheck: string;
  avatar: FileList | null;
};

export type RegisterResponseType = {
  status: string;
  data: User;
};

// register
export const fetchRegister = async (
  registerInfo: RegisterInfoType,
): Promise<RegisterResponseType> => {
  const formData = new FormData();

  Object.entries(registerInfo).forEach(([key, value]) => {
    // 判斷體重或腰圍是否有填寫，沒有的話就不用加到formData中
    if (
      (key === 'weight' || key === 'waistline') &&
      (value === null || value === 0 || value === '')
    )
      return;

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
    return res.data;
  } catch (err: unknown) {
    return Promise.reject(err);
  }
};

export type LoginResponseType = {
  status: string;
  token: string;
  user: User;
};

// login
export const fetchLogin = async (email: string, password: string): Promise<LoginResponseType> => {
  try {
    const res = await axios.post(`${API_URL}/signin`, {
      email,
      password,
      expiresIn: '8h', // 8 hours
    });

    setToken(res.data.token);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
