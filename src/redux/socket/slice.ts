import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SocketState {
  disconnectors: { [x: string]: () => void }[];
}

const initialState: SocketState = {
  disconnectors: []
};

export const socketSlice = createSlice({
  name: 'sockets',
  initialState,
  reducers: {
    disconnectAll: state => {
      state.disconnectors.forEach(disconnector => {
        Object.values(disconnector).forEach(disconnect => disconnect());
      });
    },
    attachDisconnector: (
      state,
      action: PayloadAction<{ [x: string]: () => void }>
    ) => {
      state.disconnectors = [...state.disconnectors, action.payload];
    },
    disconnectAndDetachDisconnector: (state, action: PayloadAction<string>) => {
      const disconnector = state.disconnectors.find(
        it => typeof it[action.payload] === 'function'
      );
      if (disconnector && disconnector[action.payload])
        disconnector[action.payload]();
      state.disconnectors = state.disconnectors.filter(
        it => Boolean(typeof it[action.payload]) === false
      );
    }
  }
});

export const {
  disconnectAndDetachDisconnector,
  attachDisconnector,
  disconnectAll
} = socketSlice.actions;

export default socketSlice.reducer;
