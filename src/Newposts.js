import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { posting } from './Redux/Userlogin';
import { userprofile,giveprofilepic } from './Redux/Followers';

import "./App.css"
export default function Newposts() {
   const [newposts, setnewpost] = useState(false);
  const dispatch = useDispatch();
  const dispatchs = useDispatch();
  const file = useRef(null);
  const profilefile = useRef(null);

  const data = useSelector((state) => state.user);
  const user = useSelector((state) => state.followers.profiledata);
   const username=useSelector((state)=>state.user.userdetails);
  const newpost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("media",file.current.files[0]); 
    formData.append("username", username);// ✅ append the actual file
    dispatch(posting(formData));
  };
  useEffect(()=>{
    dispatchs(userprofile());
  },[dispatchs])
  const uploadimage=(e)=>{
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append("profile",profilefile.current.files[0]);
     dispatch(giveprofilepic(formDatas));
  }
  return (
    <div>
      <button className="primary" onClick={() => setnewpost(true)}>Create New Post</button>
      {newposts && <>      
        <form onSubmit={newpost}>
          <input type="file" ref={file} accept="image/*,video/*" />
          <input type="submit" value="Upload" />
        </form>
      {data.postbooleans && <p>uploading......</p>}
      {data.postboolean && <p>✅ Inserted the new post successfully</p>}
      </>}
      <div className="profile-container">
  <div className="profile-header">
    <img
    className="profile-pic"
    src={user.profilepic ? user.profilepic : "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"}
    alt="profile"
    />
    <button className="primary" onClick={() => setnewpost(true)}>+</button>
    {newposts &&<form onSubmit={uploadimage}>
        <input type='file' ref={profilefile}/>
        <input type='submit'></input>
    </form>}
    <div className="profile-info">
      <h2 className="username">{user.username}</h2>
      <div className="stats">
        <p><strong>{user.postingCount}</strong> posts</p>
        <p><strong>{user.followersCount}</strong> followers</p>
        <p><strong>{user.followingCount}</strong> following</p>
      </div>
      <button className="update-btn">Update Profile</button>
    </div>
  </div>
</div>
      {/* <PostDetails/> */}
    </div>
  );
}
