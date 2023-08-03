import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QueryProvider };
