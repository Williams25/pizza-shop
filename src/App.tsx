import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};
