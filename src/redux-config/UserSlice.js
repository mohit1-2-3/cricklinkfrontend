import { createSlice } from '@reduxjs/toolkit';

const slice =  createSlice({
    name:"UserSlice",
    initialState:{
        user:{},
        token: null,
        message: "",
        isLoggedIn: false
},
  reducers:{
       setUser: (state,action)=>{
          console.log(action.payload);
          state.message=action.payload.message;
          state.token=action.payload.token;
          state.user=action.payload.user;
          state.isLoggedIn=true;
          delete state.user.password
       }
  }

})

export const {setUser}= slice.actions;
export default slice.reducer;