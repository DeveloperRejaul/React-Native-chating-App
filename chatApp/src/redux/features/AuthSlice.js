const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  auth: false,
  token: null,
  email: '',
  userId: '',
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.auth = true;
      state.token = action.payload.userInfo.token;
      state.email = action.payload.userInfo.email;
      state.userId = action.payload.userInfo.userId;
    },

    logOut: state => {
      state.auth = false;
    },
  },
});

export const {handleAuth, logOut} = AuthSlice.actions;
export default AuthSlice.reducer;
