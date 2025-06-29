import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL from .env
const API = process.env.REACT_APP_BACKEND_URL;

// Fetch all followers (public)
export const fetchfollowers = createAsyncThunk("public/followers", async () => {
  const data = await axios.get(`${API}/public/followers`);
  return data.data;
});

// Fetch logged-in user profile (protected)
export const userprofile = createAsyncThunk("api/profile", async () => {
  const data = await axios.get(`${API}/api/registra/followers/details`, {
    withCredentials: true,
  });
  return data.data;
});

// Upload profile picture (multipart)
export const giveprofilepic = createAsyncThunk("api/profilepic", async (formData) => {
  const res = await axios.post(`${API}/api/registra/followers/details`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return res.data;
});

// Slice
const Followers = createSlice({
  name: "followers",
  initialState: {
    publicfollowerdata: null,
    tempboolean: false,
    profiledata: [{}],
  },
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchfollowers.fulfilled, (state, action) => {
        state.publicfollowerdata = action.payload.followerid;
        state.tempboolean = true;
      })
      .addCase(userprofile.fulfilled, (state, action) => {
        state.profiledata = action.payload;
      })
      .addCase(giveprofilepic.fulfilled, (state, action) => {
        state.profiledata = action.payload;
      });
  },
});

export default Followers.reducer;
