import type { RouteObject } from 'react-router-dom';
import SignIn from 'pages/signIn';
import Register from 'pages/register';
import LineLogin from 'pages/signIn/components/LineLogin';
import Profile from 'pages/profile';
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
    path: '/signin/line',
    element: <LineLogin />,
    children: [],
  },
  {
    path: '/signin',
    element: <SignIn />,
    children: [],
  },
  {
    path: '/register',
    element: <Register />,
    children: [],
  },
  {
    path: '/profile/:userId',
    element: <Profile />,
    children: [],
  },
  {
    path: '*',
    element: <NotFound />,
    children: [],
  },
];

export default routes;
