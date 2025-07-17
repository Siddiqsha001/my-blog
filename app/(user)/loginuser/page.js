'use client';
import { useState } from 'react';

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
    <div style={{ padding: 20 }}>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="user/admin" onChange={handleChange} required />
        <br /><br />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <br /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
      <div style={{
        marginTop: '32px',
        padding: '18px 20px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '18px',
        fontWeight: '600',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        border: '2px solid #a78bfa',
        maxWidth: '340px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <p style={{ margin: 0, letterSpacing: '0.5px' }}>
          <span style={{fontSize:'20px',fontWeight:'bold',display:'block',marginBottom:'8px'}}>User Login Credentials</span>
          Username: <span style={{fontWeight:'bold',background:'#23244a',color:'#a78bfa',padding:'2px 8px',borderRadius:'4px'}}>user</span><br />
          Password: <span style={{fontWeight:'bold',background:'#23244a',color:'#a78bfa',padding:'2px 8px',borderRadius:'4px'}}>user123</span>
        </p>
      </div>
    </div>
  );
}