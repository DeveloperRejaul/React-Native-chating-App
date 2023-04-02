import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from '../features/AuthSlice.js';
import SplassReducer from '../features/SplassSlice.js';
import oneByOneChatReducer from '../features/oneByOneChatSlice';

const reducer = combineReducers({
  auth: AuthReducer,
  splass: SplassReducer,
  oneByOneChat: oneByOneChatReducer,
});

const persistConfig = {
  key: '@root',
  storage: AsyncStorage,
  blacklist: ['Splass', 'Auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
