import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignUp.module.css';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = form;
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/admins/login', { email, password });
      if (res.status === 200) {
        toast.success('Admin logged in successfully');
        // Save admin data or token if you have one
        // Redirect to admin dashboard
        // navigate('/admin-dashboard');
        navigate('/admin/dashboard');

      }
    } catch (err) {
      setError(err.response?.data?.message || 'Admin login failed');
      toast.error(err.response?.data?.message || 'Admin login failed');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <input
          className={styles.Input}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          className={styles.Input}
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        {error && <p className={styles.error}>* {error}</p>}
        <button type="submit" className={styles.signupbtn}>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
