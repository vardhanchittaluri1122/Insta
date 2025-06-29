import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Environment variable for backend URL
const API = process.env.REACT_APP_BACKEND_URL;

// Send a message
export const sendmsg = createAsyncThunk("api/message", async (values) => {
  const { message, username } = values;
  await axios.post(
    `${API}/api/message`,
    {
      to: username,
      message: message,
    },
    {
      withCredentials: true,
    }
  );
  return { message, to: username };
});

// Get messages from a user
export const getmsgs = createAsyncThunk("api/get", async (values) => {
  const { username } = values;
  const data = await axios.get(`${API}/api/message/${username}`, {
    withCredentials: true,
  });
  return data.data;
});

// Message slice
const Msg = createSlice({
  name: "msg",
  initialState: {
    fromme: false,
    username: "",
    msgboolean: false,
    message: [],
  },
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(sendmsg.fulfilled, (state, action) => {
        state.fromme = true;
        state.msgboolean = true;
        state.message.push({
          from: state.username,
          message: action.payload.message,
        });
      })
      .addCase(getmsgs.fulfilled, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default Msg.reducer;
