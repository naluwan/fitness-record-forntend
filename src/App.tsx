import { useRoutes } from 'react-router-dom';
import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import routes from './routes';

const App: React.FC = () => {
  const { isAppInitializedComplete, onSetIsDark, init } = useRecordStore((state) => {
    return {
      isAppInitializedComplete: state.isAppInitializedComplete,
      onSetIsDark: state.onSetIsDark,
      init: state.init,
    };
  }, shallow);

  React.useEffect(() => {
    if (!isAppInitializedComplete) {
      init();
    }
    const isDarkMode = localStorage.getItem('isDark') || 'false';
    if (isDarkMode === 'true') {
      onSetIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      onSetIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  });

  const element = useRoutes(routes);
  return element;
};

export default App;
