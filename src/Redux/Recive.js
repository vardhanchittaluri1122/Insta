import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Use environment variable for backend base URL
const API = process.env.REACT_APP_BACKEND_URL;

// Fetch all users
export const fetchdata = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(`${API}/users`);
  return res.data;
});

// Edit a user
export const edit = createAsyncThunk("users/editUser", async (updatedUser) => {
  const { num, name, email } = updatedUser;
  const res = await axios.put(`${API}/users/${num}`, {
    id: parseInt(num),
    name,
    email,
  });
  return res.data;
});

const data={
    users:[],
    status:false,
    loading:null
}
const Recive=createSlice({
    name:"Recive",
    initialState:data,
    reducers:{
        // edit:(state,action)=>{
        //     const {num,name,email}=action.payload;
        //     const index=state.users.findIndex((user)=>user.id===parseInt(num));
        //     if(index !== -1){
        //         state.users[index]={
        //             ...state.users[index],
        //             name,email
        //         }
        //     }
        // }
    },
    extraReducers:(build)=>{
            build.addCase(fetchdata.pending,(state)=>{
                    state.loading=null;
                    state.status=true
            })
            .addCase(fetchdata.fulfilled,(state,action)=>{
                state.users=action.payload;
            })
            .addCase(fetchdata.rejected,(state)=>{
                state.status=false;
            })
             .addCase(edit.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
    }
})

export default Recive.reducer;