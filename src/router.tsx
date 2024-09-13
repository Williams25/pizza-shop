import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { SignIn } from './pages/auth/sign-in';
import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import { SignUp } from './pages/auth/sign-up';
import { Orders } from './pages/app/orders/orders';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { NotFound } from './pages/404';
import { Error } from './pages/error';

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    path: '/',
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    path: '/',
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
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
