import React from 'react';
import { useUserStore } from '../store/userStore';
import { Navigate } from 'react-router-dom';

export function withAuth<T>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const isLogin = useUserStore((state) => state.isLogin);

    if (!isLogin) {
      return <Navigate to="/login" replace />;
    }
    return <Component {...(props as any)} />;
  };
} 