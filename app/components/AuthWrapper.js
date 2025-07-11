'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthData, requireAuth } from '../lib/auth';

export default function AuthWrapper({ children, requiredRole = null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authData = getAuthData();
      
      if (!authData || !authData.isAuthenticated) {
        router.push('/login');
        return;
      }
      
      if (requiredRole && authData.userType !== requiredRole) {
        router.push('/login');
        return;
      }
      
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
}
