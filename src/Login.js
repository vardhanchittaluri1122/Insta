import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  userlogincheck } from "./Redux/Userlogin"; 
import { authcheck } from "./Redux/Userlogin"; 
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

export default function Login() {
  const userid = useRef(null);
  const userpass = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSuccess = useSelector((state) => state.user.auth); 
  const loginFail = useSelector((state) => state.user.userlogincheck);
  const logins = async (e) => {
    e.preventDefault();
    const user = userid.current.value.trim();
    const pass = userpass.current.value.trim();

    if (user && pass) {
      const result = await dispatch(userlogincheck({ username: user, password: pass }));
      if (result.meta.requestStatus === "fulfilled") {
        await dispatch(authcheck());
        navigate("/home");
      } else {
        alert("❌ Invalid username or password");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={logins} className="login-form">
        <h2>Login</h2>
        <input ref={userid} type="text" placeholder="Enter username" required />
        <input ref={userpass} type="password" placeholder="Enter password" required />
        <input type="submit" value="Login" />
        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        {loginSuccess && <p className="success-msg">✅ Logged in successfully!</p>}
        {loginFail === false && <p className="error-msg">❌ Incorrect credentials</p>}
      </form>
    </div>
  );
}
