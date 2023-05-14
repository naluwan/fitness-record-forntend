import type { RouteObject } from 'react-router-dom';
import SignIn from 'pages/signIn';
import Following from './pages/following';
import Home from './pages/home';
import NotFound from './pages/notFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [],
  },
  {
    path: '/following',
    element: <Following />,
    children: [],
  },
  {
    path: '/signin',
    element: <SignIn />,
    children: [],
  },
  {
    path: '*',
    element: <NotFound />,
    children: [],
  },
];

export default routes;
