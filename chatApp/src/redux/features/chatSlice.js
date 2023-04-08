const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  roomId: null,
  userInfo: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    handleOneByOneChat: (state, action) => {
      state.roomId = action.payload.roomId;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const {handleOneByOneChat} = chatSlice.actions;
export default chatSlice.reducer;
