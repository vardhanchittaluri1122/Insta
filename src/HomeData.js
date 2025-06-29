import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchfollowers } from "./Redux/Followers";
import { fetchdata } from "./Redux/Userlogin";
import Dots from "./Dots"; 
import "./App.css";
import { Link } from "react-router-dom";

export default function HomeData() {
  const dispatch = useDispatch();
  const postdata = useSelector((state) => state.user.postdata);
  const followerdata = useSelector((state) => state.followers.publicfollowerdata);
  const temptbollean = useSelector((state) => state.followers.tempboolean);
  const [liked, setLiked] = useState({});
  const [dot,setdot]=useState(false);
  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);
  useEffect(()=>{
    dispatch(fetchfollowers()); 
  },[dispatch])
  const toggleLike = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <div className="feed-container">
      <h2 className="feed-title">Explore</h2>
      {Array.isArray(postdata) && postdata.length > 0 ? (
        postdata.map((item, index) => (
          <div className="post-card" key={index}>
            <div className="post-header">
              <p className="userid">{item.username || "Unknown User"}</p>
              <button className="menu-button">⋮</button>
            </div>

            {item.mediaType === "video" ? (
              <video controls className="post-image">
                <source src={item.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item.mediaUrl} alt="post" className="post-image" />
            )}

            <div className="post-actions">
              <button
                className={`like-button ${liked[index] ? "liked" : ""}`}
                onClick={() => toggleLike(index)}
              >
                ♥
              </button>
              <button className="comment-button">💬</button>
              <button className="share-button">🔗</button>
              <button className="save-button">🔖</button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
      <div className="followers-section">
  <h3 className="suggested-title">Suggested for You</h3>
  <div className="follower-scroll">
    {temptbollean && Array.isArray(followerdata) && (
      <>
        {followerdata.map((value, index) => (
          <div className="follower-card" key={index}>
            <div className="follower-info">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${value}`}
                alt="Profile"
                className="follower-profile-pic"
              />
              <p className="follower-username">{value}</p>
            </div>
            <div className="follower-actions">
              <button className="follow-btn">Follow</button>
              <Link to={`/message/${value}`}><button className="follow-btn">Message</button></Link>
              <button className="menu-btn" onClick={() => setdot(true)}>⋮</button>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
  {dot && <Dots />}
</div>


    </div>
  );
}
