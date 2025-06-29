import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authcheck } from './Redux/Userlogin'; 

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const API = process.env.REACT_APP_BACKEND_URL;
  const logouts = async () => {
    try {
      await axios.post(`${API}/api/check/logout`, {}, { withCredentials: true });
      await dispatch(authcheck());
      navigate("/home"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>Logging out...
      <button onClick={logouts}>Logout</button>
    </div>
  );
}
