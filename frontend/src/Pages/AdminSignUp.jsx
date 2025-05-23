import {
  createUserWithEmailAndPassword
} from '@firebase/auth';
import { auth } from '../firebase';
import React, { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

function AdminSignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = form;

    if (!name || !email || !password) {
      return setError("All fields are required!");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      return setError("Email must contain '@' and end with '.com'");
    }

    if (password.length < 7) {
      return setError("Password must be at least 7 characters long!");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await axios.post("http://localhost:5000/api/admins/signup", {
        ...form,
        uid: user.uid
      });

      toast.success("Admin signed up successfully");
      // navigate("/login");
      navigate("/admin-login");

    } catch (err) {
      setError(err.message);
      toast.error("Admin signup failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Admin Sign Up</h1>
        <input className={styles.Input} type="text" placeholder="Name" name="name" onChange={handleChange} />
        <input className={styles.Input} type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input className={styles.Input} type="password" placeholder="Password" name="password" onChange={handleChange} />
        {error && <p className={styles.error}>* {error}</p>}
        <button type="submit" className={styles.signupbtn}>Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignUp;
