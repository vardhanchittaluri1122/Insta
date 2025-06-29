import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchfollowers=createAsyncThunk("public/followers",async()=>{
    const data=await axios.get("http://localhost:4000/public/followers");
    return data.data;
})
export const userprofile=createAsyncThunk("api/profile",async()=>{
    const data=await axios.get("http://localhost:4000/api/registra/followers/details",{
        withCredentials:true
    });
    return data.data;
})
export const giveprofilepic = createAsyncThunk("api/profilepic", async (formData) => {
  const res = await axios.post(
    "http://localhost:4000/api/registra/followers/details",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }
  );
  return res.data;
});

const Followers=createSlice({
    name:"followers",
    initialState:{
      publicfollowerdata:null,
      tempboolean:false,
    // username:"",
    // folloers:"",
    // following:"",
    // post:"",
    profiledata:[{}]
    },
    reducers:{

    },
    extraReducers:(build)=>{
        build.addCase(fetchfollowers.fulfilled,(state,action)=>{
            state.publicfollowerdata=action.payload.followerid;
            state.tempboolean=true;
        })
        .addCase(userprofile.fulfilled,(state,action)=>{
            state.profiledata=action.payload;
        })
        .addCase(giveprofilepic.fulfilled,(state,action)=>{
            state.profiledata=action.payload;
        })
    }
})
export default Followers.reducer;