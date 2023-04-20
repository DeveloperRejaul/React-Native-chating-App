import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: "",
  },
  reducers: {
    handleLogin: (state, action) => {
      console.log(action);
    },
    handleLogOut: (state, _action) => {
      state.isLogin = false;
    },
  },
});

export const { handleLogOut, handleLogin } = authSlice.actions;
export default authSlice.reducer;
