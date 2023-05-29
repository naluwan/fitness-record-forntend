/* eslint-disable camelcase */
import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Toast } from 'utils/swal';
import Qs from 'qs';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { useNavigate } from 'react-router-dom';
import Loading from 'components/Loading';

const LineLogin = () => {
  const go = useNavigate();
  const [getToken, setGetToken] = React.useState(false);
  const [verifyUser, setVerifyUser] = React.useState(false);
  const [options, setOptions] = React.useState({
    grant_type: 'authorization_code',
    code: '',
    redirect_uri: process.env.REACT_APP_LINE_LOGIN_CALLBACK_URL,
    client_id: process.env.REACT_APP_LINE_LOGIN_CHANNEL_ID,
    client_secret: process.env.REACT_APP_LINE_LOGIN_CHANNEL_SECRET,
  });

  const [result, setResult] = React.useState({ id_token: '' });

  const { isFetching, onLineLogin } = useRecordStore((state) => {
    return {
      isFetching: state.isFetching,
      onLineLogin: state.onLineLogin,
    };
  }, shallow);

  // 剛進入頁面獲取網址上的參數code
  React.useEffect(() => {
    const parse = queryString.parse(window.location.search);
    if (Object.keys(parse).length > 0) {
      const { code } = parse;
      setOptions((prev) => {
        return {
          ...prev,
          code: code as string,
        };
      });
      setGetToken(true);
    }
  }, []);

  // 當options中的code被更新後，將options拿去line token api要token，並更新result的值
  React.useEffect(() => {
    if (getToken) {
      console.log('options ==> ', options);
      axios
        .post('https://api.line.me/oauth2/v2.1/token', Qs.stringify(options), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then((res) => {
          const { id_token } = res.data;
          setResult({ id_token });
          setVerifyUser(true);
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: '登入失敗',
            text: err,
          });
        });
    }
  }, [options, getToken]);

  // 當result的值被更新後，將result打回後端獲取jwt token和user資料，最後到回首頁
  React.useEffect(() => {
    if (verifyUser) {
      onLineLogin(result)
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: '登入成功',
            text: `${res.user?.name} 您好`,
          });
          go('/');
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: '登入失敗',
            text: err.response.data.message,
          });
        })
        .finally(() => {
          setGetToken(false);
          setVerifyUser(false);
          setOptions((prev) => {
            return {
              ...prev,
              code: '',
            };
          });
          setResult({ id_token: '' });
        });
    }
  }, [result, verifyUser, go, onLineLogin]);

  // 在執行登入時，都顯示loading圖示
  return <div className='flex h-screen w-full justify-center'>{isFetching && <Loading />}</div>;
};

export default LineLogin;
