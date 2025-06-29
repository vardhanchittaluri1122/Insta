import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sendmsg, getmsgs } from './Redux/Msg';
import './Message.css'; 
export default function Message() {
  const { username } = useParams(); 
  const msg = useRef(null);
  const dispatch = useDispatch();
  const msgbollean = useSelector((state) => state.msg.msgboolean);
  const messages = useSelector((state) => state.msg.message);
  const user = useSelector((state) => state.user.userdetails); 
  useEffect(() => {
    dispatch(getmsgs({ username }));
  }, [dispatch, username]);
  const send = () => {
    const text = msg.current.value.trim();
    if (text !== "") {
      dispatch(sendmsg({ message: text, username }));
      msg.current.value = "";
    }
  };
  return (
    <div className="message-container">
      <h3 style={{ color: 'white' }}>Chat with {username}</h3>
      <div className="chat-box">
        {Array.isArray(messages) && messages.map((msg, i) => (
          <p key={i} className={msg.from === user ? "from-me" : "from-them"}>
            {msg.message}<br />
            <small>From: {msg.from}</small>
          </p>
        ))}
      </div>
      <input type="text" ref={msg} placeholder="Type..." />
      <button onClick={send}>Send</button>
      {msgbollean && <p style={{ color: "green" }}>✅ Message sent</p>}
    </div>
  );
}
