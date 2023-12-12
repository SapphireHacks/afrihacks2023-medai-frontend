import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import conversationsReducer from './conversations/slice';
import socketReducer from './socket/slice';
import hospitalSearchReducer from './hospital-search/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      conversations: conversationsReducer,
      socket: socketReducer,
      hospitalSearch: hospitalSearchReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
