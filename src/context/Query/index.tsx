import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../api/common';

interface QueryProviderProps {
  children: ReactElement;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
