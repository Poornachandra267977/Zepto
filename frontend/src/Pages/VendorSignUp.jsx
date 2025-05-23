import {
  createUserWithEmailAndPassword
} from '@firebase/auth';
import { auth } from '../firebase';
import React, { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

function VendorSignUp() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   const { name, phone, email, password } = form;

  //   if (!name || !phone || !email || !password) {
  //     return setError("All fields are required!");
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  //   if (!emailRegex.test(email)) {
  //     return setError("Email must contain '@' and end with '.com'");
  //   }

  //   const phoneRegex = /^[6-9]\d{9}$/;
  //   if (!phoneRegex.test(phone)) {
  //     return setError("Phone must start with 6-9 and be 10 digits (e.g. 9876543210)");
  //   }

  //   if (password.length < 7) {
  //     return setError("Password must be at least 7 characters long!");
  //   }

  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = res.user;

  //     await axios.post("http://localhost:5000/api/vendors/signup", {
  //       ...form,
  //       uid: user.uid
  //     });

  //     toast.success("Vendor signed up successfully");
  //     navigate("/login");
  //   } catch (err) {
  //     setError(err.message);
  //     toast.error("Vendor signup failed");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const { name, phone, email, password } = form;

  if (!name || !phone || !email || !password) {
    return setError("All fields are required!");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  if (!emailRegex.test(email)) {
    return setError("Email must contain '@' and end with '.com'");
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return setError("Phone must start with 6-9 and be 10 digits (e.g. 9876543210)");
  }

  if (password.length < 7) {
    return setError("Password must be at least 7 characters long!");
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Send data to backend and get vendorId back
    const response = await axios.post("http://localhost:5000/api/vendors/signup", {
      ...form,
      uid: user.uid
    });

    const vendorId = response.data.vendor._id;
    localStorage.setItem("vendorId", vendorId); // store for later use

    toast.success("Vendor signed up successfully");

    // ✅ Redirect to add product page
    navigate("/vendor/add-product");
  } catch (err) {
    setError(err.message);
    toast.error("Vendor signup failed");
  }
};

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Vendor Sign Up</h1>
        <input className={styles.Input} type="text" placeholder="Name" name="name" onChange={handleChange} />
        <input className={styles.Input} type="text" placeholder="Phone" name="phone" onChange={handleChange} />
        <input className={styles.Input} type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input className={styles.Input} type="password" placeholder="Password" name="password" onChange={handleChange} />
        {error && <p className={styles.error}>* {error}</p>}
        <button type="submit" className={styles.signupbtn}>Sign Up</button>
      </form>
    </div>
  );
}

export default VendorSignUp;
