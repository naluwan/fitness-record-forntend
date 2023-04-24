import { useRoutes } from 'react-router-dom';
import React from 'react';
import routes from './routes';

const App: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
