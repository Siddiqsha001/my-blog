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
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <br /><br />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <br /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}