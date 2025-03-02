import PrivateRoute from '@/presentation/components/auth/PrivateRoute';
import React from 'react';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}