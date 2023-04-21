import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    id: "",
    token: "",
    image: "",
  },
  reducers: {
    handleLogin: (state, action) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.image = action.payload.image;
    },
    handleLogOut: (state, _action) => {
      state.isLogin = false;
    },
  },
});

export const { handleLogOut, handleLogin } = authSlice.actions;
export default authSlice.reducer;
