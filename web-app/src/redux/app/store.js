import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import { chatApi } from "../services/chatApi";

// config persist
const persistConfig = {
  key: "root",
  storage: storage,
};

// persist reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const chatStore = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    auth: persistedAuthReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(chatApi.middleware),
});

setupListeners(chatStore.dispatch);

export const persisStore = persistStore(chatStore);
