import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Toaster richColors closeButton />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};
