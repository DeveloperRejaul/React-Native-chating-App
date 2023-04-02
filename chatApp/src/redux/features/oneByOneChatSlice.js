const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  roomId: null,
  userInfo: null,
};

export const oneByOneChatSlice = createSlice({
  name: 'oneByOneChatSlice',
  initialState,
  reducers: {
    handleOneByOneChat: (state, action) => {
      state.roomId = action.payload.roomId;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const {handleOneByOneChat} = oneByOneChatSlice.actions;
export default oneByOneChatSlice.reducer;
