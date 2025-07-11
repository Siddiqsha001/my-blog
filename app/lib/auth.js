'use client';

export function getAuthData() {
  if (typeof window !== 'undefined') {
    const authData = localStorage.getItem('blogAuth');
    return authData ? JSON.parse(authData) : null;
  }
  return null;
}

export function isAuthenticated() {
  const authData = getAuthData();
  return authData && authData.isAuthenticated === true;
}

export function isAdmin() {
  const authData = getAuthData();
  return authData && authData.userType === 'admin';
}

export function isUser() {
  const authData = getAuthData();
  return authData && authData.userType === 'user';
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('blogAuth');
  }
}

export function requireAuth(userType = null) {
  const authData = getAuthData();
  
  if (!authData || !authData.isAuthenticated) {
    return false;
  }
  
  if (userType && authData.userType !== userType) {
    return false;
  }
  
  return true;
}
