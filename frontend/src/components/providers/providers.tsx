'use client';

import { PropsWithChildren } from 'react';
import AuthProvider from '../../hooks/useAuth';

export default function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
