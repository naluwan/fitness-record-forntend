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
    path: '/fitness_record_frontend/',
    element: <Home />,
    children: [],
  },
  {
    path: '/fitness_record_frontend/following',
    element: <Following />,
    children: [],
  },
  {
    path: '/fitness_record_frontend/signin/line',
    element: <LineLogin />,
    children: [],
  },
  {
    path: '/fitness_record_frontend/signin',
    element: <SignIn />,
    children: [],
  },
  {
    path: '/fitness_record_frontend/register',
    element: <Register />,
    children: [],
  },
  {
    path: '/fitness_record_frontend/profile/:userId',
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
