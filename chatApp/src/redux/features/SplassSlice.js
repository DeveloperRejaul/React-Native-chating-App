const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  Splass: false,
};

export const SplassSlice = createSlice({
  name: 'Splass',
  initialState,
  reducers: {
    handleSplass: state => {
      state.Splass = true;
    },
  },
});

export const {handleSplass} = SplassSlice.actions;

export default SplassSlice.reducer;
