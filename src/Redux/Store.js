import { configureStore } from '@reduxjs/toolkit';
import ReciveReducer from "./Recive"
import FollowerReducer from './Followers'
import UserloginReducer from './Userlogin'
import MessageReducer from './Msg';
export const Store = configureStore({
  reducer: {
    Reciever:ReciveReducer,
    followers:FollowerReducer,
    user:UserloginReducer,
    msg:MessageReducer
  },
});
