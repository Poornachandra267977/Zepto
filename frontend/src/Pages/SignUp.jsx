
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
  } from '@firebase/auth';
  import { auth } from '../firebase';
  import React, { useState } from 'react';
  import styles from '../styles/SignUp.module.css';
  import { Link, useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { userLogin } from '../Redux/UserAuth/userAuth.actions';
  import { FcGoogle } from "react-icons/fc";
  import "react-toastify/dist/ReactToastify.css";
  import { toast } from "react-toastify";
  import axios from "axios";
  
  function SignUp() {
    const [name, setName] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
  
    const signUp = async (e) => {
      e.preventDefault();
      setError("");
  
      // Full phone with +91 prefix
      const fullPhone = `${countryCode}${phoneNumber}`;
  
      if (!name || !phoneNumber || !email || !password) {
        setError("All fields are required!");
        return;
      }
  
      // Email must include "@" and end with ".com"
      const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
      if (!emailRegex.test(email)) {
        setError("Email must contain '@' and end with '.com'");
        return;
      }
  
      // Phone must be 10 digits, start with 6-9
      const phoneRegex = /^\+91[6-9]\d{9}$/;
      if (!phoneRegex.test(fullPhone)) {
        setError("Phone must start with 6-9 and be 10 digits long (e.g. 9876543210)");
        return;
      }
  
      if (password.length < 7) {
        setError("Password must be at least 7 characters long!");
        return;
      }
  
      setLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
  
        // Send user info to MongoDB backend
        await axios.post("http://localhost:5000/api/users/signup", {
          name,
          phone: fullPhone,
          email,
          password,
          uid: user.uid,
          profileImage: user.photoURL || ""
        });
  
        dispatch(userLogin(user));
        localStorage.setItem("userInfoF", JSON.stringify(user));
        toast.success("Signup Successfully Done!");
        setLoading(false);
        navigate('/login');
      }
      
      catch (error) {
        setLoading(false);
        toast.warn("Signup Failed!", error.message);
        console.log(error);
        setError(error.message); // ✅ FIXED
      }
    // catch (error) {
    //     setLoading(false);
    //     console.log("Signup error:", error);
      
    //     const message = error?.response?.data?.message || error.message || "Signup failed";
    //     toast.warn(`Signup Failed! ${message}`);
    //     setError(message);
    //   }
      
      
    };
  
    const handleGoogle = async () => {
      try {
        let res = await signInWithPopup(auth, provider);
        const user = res.user;
  
        await axios.post("http://localhost:5000/api/users/signup", {
          name: user.displayName || "",
          phone: "", // optional, can ask later
          email: user.email,
          password: "", // not available in Google login
          uid: user.uid,
          profileImage: user.photoURL || ""
        });
  
        dispatch(userLogin(user));
        localStorage.setItem("userInfoF", JSON.stringify(user));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className={styles.container}>
        {isLoading ? (
          <div>Loading!!</div>
        ) : (
          <form onSubmit={signUp}>
            <h1>Sign Up</h1>
  
            <input
              className={styles.Input}
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
  
            <div className={styles.phoneContainer}>
              <input
                className={styles.Input}
                type="text"
                name="countryCode"
                value={countryCode}
                readOnly
              />
              <input
                className={styles.Input}
                type="text"
                placeholder="Enter 10-digit phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
  
            <input
              className={styles.Input}
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <input
              className={styles.Input}
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
  
            {error && (
              <div className={styles.error}>
                * {error}
              </div>
            )}
  
            <div className={styles.signupBox}>
              <p>Already a User? <Link to='/login'>Login</Link></p>
            </div>
  
            <button type="submit" className={styles.signupbtn}>Sign Up</button>
  
            <div>
              <h1 className='text-[18px] font-semibold mt-2'>Or</h1>
            </div>
  
            <button onClick={handleGoogle} type="button" className={styles.signGoogle}>
              Sign Up with Google <FcGoogle className='text-[21px]' />
            </button>
          </form>
        )}
      </div>
    );
  }
  
  export default SignUp;
