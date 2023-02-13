import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from '../features/AuthSlice.js';
import SplassReducer from '../features/SplassSlice.js';

const reducer = combineReducers({
  auth: AuthReducer,
  splass: SplassReducer,
});

const persistConfig = {
  key: '@root',
  storage: AsyncStorage,
  whitelist: ['Splass'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
