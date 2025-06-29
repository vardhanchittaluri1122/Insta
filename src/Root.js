

import { useState } from "react";
import  "./App.css";

function Root({ user,ondelete}) {
  
  const [showbutton,setbutton]=useState(true);
   const ok=()=>{
          setbutton(false);

   }
   const cancel=()=>{
       ondelete();
   }

  return (
    <div style={{border:"2px solid black" ,color:"green",backgroundColor:"pink"}}>
        <ul>
          <li>user id :{user.id}</li>
          <li>user Name:{user.username}</li>
          <li>user email:{user.email}</li>
          
        </ul>
        {showbutton ===true &&
        <ul id="right">
          <li><button style={{width:"50px"}} onClick={ok}>ok</button></li>
          <li><button style={{width:"50px"}} onClick={cancel}>cancel</button></li>
        </ul>
        }
        
        
    </div>
  );
}
export default Root;
