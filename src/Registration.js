import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userregistra } from './Redux/Userlogin';


export default function Registration() {
    const dispatch=useDispatch();
    const data = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
 const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      setMessage('❌ All fields are required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('❌ Enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }
    dispatch(userregistra({username:formData.username,password:formData.password}))

  };

  return (
    <div className="register-container">
      <h3>Registration</h3>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
      {message && <p className="form-message">{message}</p>}
      {data.boolean && <p className="success-msg">✅ Logged in successfully!</p>}
    </div>
  );
}
