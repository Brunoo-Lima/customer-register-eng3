'use client';

import { PropsWithChildren } from 'react';
import AuthProvider from '../../hooks/useAuth';
import { FilterProvider } from '@/hooks/useFilter';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <FilterProvider>{children}</FilterProvider>
    </AuthProvider>
  );
}
