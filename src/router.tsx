import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { SignIn } from './pages/auth/sign-in';
import { Dashboard } from './pages/app/dashboard';
import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';

const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <SignIn />,
      },
    ],
    path: '/',
  },
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
];

export const router = createBrowserRouter(routes);
