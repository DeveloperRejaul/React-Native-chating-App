const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  roomId: null,
  userInfo: null,
  lestMessage: {
    roomId: '',
    reserverId: '',
    time: '',
    message: '',
  },
};

export const oneByOneChatSlice = createSlice({
  name: 'oneByOneChat',
  initialState,
  reducers: {
    handleOneByOneChat: (state, action) => {
      state.roomId = action.payload.roomId;
      state.userInfo = action.payload.userInfo;
    },
    handleLastMessage: (state, action) => {
      state.lestMessage = {
        roomId: action.payload.chatRoom,
        message: action.payload.text,
        reserverId: action.payload.sender,
        time: action.payload.createdAt,
      };
    },
  },
});

export const {handleOneByOneChat, handleLastMessage} =
  oneByOneChatSlice.actions;
export default oneByOneChatSlice.reducer;
