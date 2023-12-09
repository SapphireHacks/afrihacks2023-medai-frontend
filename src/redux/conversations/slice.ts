import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../user/slice';

export type Conversation = {
  _id: string;
  title: string;
  participants: User['data'][];
};

export interface ConversationsState {
  conversations: Conversation[];
  activeConversation: string | null;
}

const initialState: ConversationsState = {
  conversations: [],
  activeConversation: null
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {}
});

export const {} = conversationsSlice.actions;

export default conversationsSlice.reducer;
