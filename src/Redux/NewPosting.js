// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// export const posting=createAsyncThunk("user/data",async(value)=>{
//     const data=await axios.post("http://localhost:5000/postupload",{
//             image:value,
//     })
//     return data.data;
// })
// const NewPosting=createSlice({
//     name:"NewPosts",
//     initialState:[],
//     reducers:{

//     },
//     extraReducers:(build)=>{
//             build.addCase(posting.fulfilled,(state,action)=>{
//                 state.push(action.payload);
//             })
//     }
// })
// export default NewPosting.reducer;