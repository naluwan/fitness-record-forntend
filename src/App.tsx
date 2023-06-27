import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import { useQuery } from 'react-query';
import routes from './routes';

const App: React.FC = () => {
  const { onSetIsDark, init } = useRecordStore((state) => {
    return {
      onSetIsDark: state.onSetIsDark,
      init: state.init,
    };
  }, shallow);

  // 只要進到這個網站，就會檢查token是否有效
  useQuery('auth', init);

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

  // 解決hashBrowser的url有#號的問題
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;

  // const element = useRoutes(routes);
  // return element;
};

export default App;
