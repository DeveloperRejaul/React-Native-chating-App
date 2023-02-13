const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  auth: false,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    handleAuth: state => {
      state.auth = true;
    },
  },
});

export const {handleAuth} = AuthSlice.actions;
export default AuthSlice.reducer;
