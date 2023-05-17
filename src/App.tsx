import { useRoutes } from 'react-router-dom';
import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore from 'store/useRecordStore';
import routes from './routes';

const App: React.FC = () => {
  const { isAppInitializedComplete, init } = useRecordStore((state) => {
    return {
      isAppInitializedComplete: state.isAppInitializedComplete,
      init: state.init,
    };
  }, shallow);
  React.useEffect(() => {
    if (!isAppInitializedComplete) {
      init();
    }
  });
  const element = useRoutes(routes);
  return element;
};

export default App;
