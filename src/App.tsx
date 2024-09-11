import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

export const App = () => {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors closeButton />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};
