import { Routes, Route, Link,Navigate } from "react-router-dom";
import { useEffect, } from "react";
import { FaHome, FaSearch, FaPlusSquare, FaSignInAlt,FaCommentDots } from "react-icons/fa";
import "./App.css";
import App from "./App";
import Login from "./Login";
import Sample from "./Sample";
import Newposts from "./Newposts";
import HomeData from "./HomeData";
import Message from "./Message"
import Registration from "./Registration";
import ProtectedJwt from "./ProtectedJwt";
import { authcheck } from "./Redux/Userlogin";
import Logout from "./Logout";
import { useDispatch,useSelector } from "react-redux";
function Home() {
 const auth= useSelector((state)=>state.user.auth);
 const username=useSelector((state)=>state.user.username)
 const authLoading = useSelector((state) => state.user.authLoading);
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(authcheck());
  },[dispatch])
  if (authLoading) {
  return <div className="loading">🔄 Checking login status...</div>;
}
  return (
    <>
<ul className="nav-bar">
  <li>
    <Link to="/home">
      <button><FaHome className="icon" />Home</button>
    </Link>
  </li>
  <li>
    <Link to="/search">
      <button><FaSearch className="icon" />Search</button>
    </Link>
  </li>
  <li>
    <Link to="/new-post">
      <button><FaPlusSquare className="icon" />Post</button>
    </Link>
  </li>
  <li>
    <Link to="/message">
      <button><FaCommentDots className="icon" />Message</button>
    </Link>
  </li>
  <li>
    <Link to="/logout">
      <button><FaSignInAlt className="icon" />Logout</button>
    </Link>
  </li>
</ul>
   
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={auth ? <Navigate to="/home" /> : <Login value={auth}/>}
          />
          <Route path="/search" element={<ProtectedJwt value={auth}><App /> </ProtectedJwt> }>
            <Route path="sample/:id" element={<Sample />} />
          </Route>
          <Route path="/new-post" element={<ProtectedJwt value={auth}><Newposts /> </ProtectedJwt>} />
          <Route path="/home" element={
                <ProtectedJwt value={auth}>
                <h2>Welcome {username } </h2>
                <HomeData />
                </ProtectedJwt>
              
            } />
          <Route path="*" element={<div style={{ color: "red", padding: "20px" }}>404 - Page Not Found</div>} />
          <Route path="/register" element={<Registration/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/message/:username" element={<Message/>}/>
        </Routes>
      </div>
    </>
  );
}
export default Home;
