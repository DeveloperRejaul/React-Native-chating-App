import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AuthReducer from '../features/AuthSlice.js';
import SplassReducer from '../features/SplassSlice.js';
import chatReducer from '../features/chatSlice.js';

const reducer = combineReducers({
  auth: AuthReducer,
  splass: SplassReducer,
  chat: chatReducer,
});

const persistConfig = {
  key: '@root',
  storage: AsyncStorage,
  blacklist: ['Splass', 'Auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Middleware setup
const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
});

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [],
});
