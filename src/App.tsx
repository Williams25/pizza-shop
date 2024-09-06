import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme/theme-provider';

export const App = () => {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  );
};
