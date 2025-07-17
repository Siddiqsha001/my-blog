'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login-new.module.css';

export default function Login() {
  const [userType, setUserType] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Default credentials
  const defaultCredentials = {
    admin: { username: 'admin', password: 'admin123' },
    user: { username: 'user', password: 'user123' }
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setError('');
    setCredentials({ username: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const expectedCreds = defaultCredentials[userType];
      
      if (credentials.username === expectedCreds.username && 
          credentials.password === expectedCreds.password) {
        
        // Store authentication in localStorage
        const authData = {
          isAuthenticated: true,
          userType: userType,
          username: credentials.username,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('blogAuth', JSON.stringify(authData));
        
        // Redirect based on user type
        if (userType === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setUserType('');
    setCredentials({ username: '', password: '' });
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Welcome to My Blog</h1>
        
        {!userType ? (
          <div className={styles.userTypeSelection}>
            <h2>Please select your role:</h2>
            <div className={styles.userTypeButtons}>
              <button 
                className={`${styles.userTypeBtn} ${styles.adminBtn}`}
                onClick={() => handleUserTypeSelect('admin')}
              >
                <div className={styles.userTypeIcon}></div>
                <div className={styles.userTypeText}>
                  <h3>Admin</h3>
                  <p>Manage and create blog posts</p>
                </div>
              </button>
              
              <button 
                className={`${styles.userTypeBtn} ${styles.userBtn}`}
                onClick={() => handleUserTypeSelect('user')}
              >
                <div className={styles.userTypeIcon}></div>
                <div className={styles.userTypeText}>
                  <h3>User</h3>
                  <p>Read and explore blog posts</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.loginForm}>
            <button className={styles.backBtn} onClick={handleBack}>
              ← Back
            </button>
            
            <h2>Login as {userType === 'admin' ? 'Admin' : 'User'}</h2>
            
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Username"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Password"
                />
              </div>
              
              {error && <div className={styles.error}>{error}</div>}
              
              <button 
                type="submit" 
                className={styles.loginBtn}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className={styles.defaultCredentials}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '180px',
                marginTop: '32px',
              }}>
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  border: '2px solid #a78bfa',
                  maxWidth: '340px',
                }}>
                  {userType === 'admin' ? (
                    <>
                      <span style={{fontSize:'20px',fontWeight:'bold',display:'block',marginBottom:'8px'}}>Admin Login Credentials</span>
                      Username: <span style={{fontWeight:'bold',background:'#23244a',color:'#a78bfa',padding:'2px 8px',borderRadius:'4px'}}>admin</span><br />
                      Password: <span style={{fontWeight:'bold',background:'#23244a',color:'#a78bfa',padding:'2px 8px',borderRadius:'4px'}}>admin123</span>
                    </>
                  ) : (
                    <>
                      <span style={{fontSize:'20px',fontWeight:'bold',display:'block',marginBottom:'8px'}}>User Login Credentials</span>
                      Username: <span style={{fontWeight:'bold',background:'#23244a',color:'#a78bfa',padding:'2px 8px',borderRadius:'4px'}}>user</span><br />
                      Password: <span style={{fontWeight:'bold',background:'#23244a',color:'#a78bfa',padding:'2px 8px',borderRadius:'4px'}}>user123</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
