const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  roomId: null,
  userInfo: null,
  lastMessage: {message: null, receiverId: null},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    handleOneByOneChat: (state, action) => {
      state.roomId = action.payload.roomId;
      state.userInfo = action.payload.userInfo;
    },
    handleLastMessage: (state, action) => {
      state.lastMessage.message = action.payload.message;
      state.lastMessage.receiverId = action.payload.receiverId;
    },
  },
});

export const {handleOneByOneChat, handleLastMessage} = chatSlice.actions;
export default chatSlice.reducer;
