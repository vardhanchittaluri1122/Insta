import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.withCredentials = true;
const API = process.env.REACT_APP_BACKEND_URL;
export const userregistra = createAsyncThunk("api/registration", async (details) => {
  const response = await axios.post(`${API}/api/registra`, details);
  return response.data;
});
export const userlogincheck = createAsyncThunk("api/check", async (values) => {
  const response = await axios.post(`${API}/api/check`, values, {
    withCredentials: true,
  });
  return response.data;
});
export const posting = createAsyncThunk("api/post", async (postdata) => {
  const response = await axios.post(`${API}/api/post`, postdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
});
export const fetchdata = createAsyncThunk("api/data", async () => {
  const response = await axios.get(`${API}/api/post`);
  return response.data;
});

export const authcheck = createAsyncThunk("api/authCheck", async () => {
  const response = await axios.get(`${API}/api/check`, {
    withCredentials: true,
  });
  return response.data;
});

const Userlogin = createSlice({
  name: "user",
  initialState: {
    boolean: false,
    postboolean: false,
    postbooleans: false,
    userlogincheck:false,
    username:"",
    auth:false,
    authload:false,
    userdetails:null,
    postdata: [
      
    ], 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userregistra.fulfilled, (state, action) => {
        state.boolean = action.payload.boolean;
      })
      .addCase(posting.pending,(state,action)=>{
        state.postbooleans=true;
      })
      .addCase(posting.fulfilled, (state, action) => {
        state.postbooleans=false;
        state.postboolean = action.payload.postboolean;
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.postdata = action.payload.postdata;
      })
      .addCase(userlogincheck.fulfilled,(state,action)=>
      {
        state.userlogincheck=action.payload.userlogincheck;
        state.userdetails=action.payload.username;
        
      })
      .addCase(authcheck.fulfilled,(state,action)=>{
        state.auth=true;
        state.authload=false;
        state.username = action.payload.user.username; 
         state.userdetails = action.payload?.user?.username || null;
      })
      .addCase(authcheck.pending,(state)=>{
        state.authload=true;
      })
      .addCase(authcheck.rejected, (state, action) => {
        state.auth = false;
        state.authload=false;
        state.userdetails = null;
      });
  },
});

export default Userlogin.reducer;
