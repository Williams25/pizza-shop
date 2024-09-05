import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { SignIn } from './pages/auth/sign-in';
import { Dashboard } from './pages/app/dashboard';
import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import { SignUp } from './pages/auth/sign-up';

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
    path: '/',
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
    path: '/',
  },
];

export const router = createBrowserRouter(routes);
