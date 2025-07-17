
'use client';
import { useState } from 'react';
import styles from './loginadmin.module.css';

export default function UserLoginPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    alert('User Data Saved in Local Storage!');
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h2 className={styles.title}>User Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" placeholder="Name" onChange={handleChange} required className={styles.input} />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required className={styles.input} />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required className={styles.input} />
          <button type="submit" className={styles.button}>Submit</button>
        </form>
        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: '#e9ecef',
          borderRadius: '6px',
          textAlign: 'center',
          color: '#212529',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          <p style={{ margin: 0 }}>
            <strong>Admin Login:</strong><br />
            Username: <span style={{fontWeight:'bold'}}>admin</span><br />
            Password: <span style={{fontWeight:'bold'}}>admin123</span>
          </p>
          <p style={{ margin: '12px 0 0 0' }}>
            <strong>User Login:</strong><br />
            Username: <span style={{fontWeight:'bold'}}>user</span><br />
            Password: <span style={{fontWeight:'bold'}}>user123</span>
          </p>
        </div>
      </div>
    </div>
  );
}