import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import type { State } from 'store/useRecordStore';
import { useQuery } from 'react-query';
import SignIn from 'pages/signIn';
import Register from 'pages/register';
import LineLogin from 'pages/signIn/components/LineLogin';
import Profile from 'pages/profile';
import { io } from 'socket.io-client';
import ProtectedRoutes from 'containers/ProtectedRoutes';
import Ranking from './pages/ranking';
import Home from './pages/home';
import NotFound from './pages/notFound';

const App: React.FC = () => {
  // 實作socket.io
  const socket = io('http://localhost:3000', {
    transports: ['websocket'],
  });

  const { init, onSetIsDark, onSetNeedUpdateRanking, onSetSocket } = useRecordStore(
    (state: State) => {
      return {
        init: state.init,
        onSetIsDark: state.onSetIsDark,
        onSetNeedUpdateRanking: state.onSetNeedUpdateRanking,
        onSetSocket: state.onSetSocket,
      };
    },
    shallow,
  );

  // 只要進到這個網站，就會檢查token是否有效
  useQuery('auth', init);

  React.useEffect(() => {
    // 進入頁面連接socket.io
    socket.connect();
    onSetSocket(socket);
    // 監聽updateRanking頻道
    socket.on('updateRanking', (needUpdate) => {
      onSetNeedUpdateRanking(needUpdate);
    });

    socket.on('disConnect', (msg) => {
      console.log('from server disConnect socket ===> ', msg);
    });

    // 離開頁面斷開socket.io連線
    return () => {
      socket.close();
    };
  }, [socket, onSetNeedUpdateRanking, onSetSocket]);

  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('isDark') || 'false';
    if (isDarkMode === 'true') {
      onSetIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      onSetIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<Home />} path='/' />
        <Route element={<Ranking />} path='/ranking' />
        <Route element={<Profile />} path='/profile/:userId' />
      </Route>

      <Route element={<LineLogin />} path='/signin/line' />
      <Route element={<SignIn />} path='/signin' />
      <Route element={<Register />} path='/register' />
      <Route element={<NotFound />} path='*' />
    </Routes>
  );
};

export default App;
