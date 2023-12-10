import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../user/slice';

export type Conversation = {
  _id: string;
  title: string;
  participants: User['data'][];
};

export interface ConversationsState {
  currentPage: number;
  conversations: Conversation[];
  activeConversation: string | null;
  hasFetchedInitial: boolean
  hasFetchedAll: boolean
}

const initialState: ConversationsState = {
  conversations: [],
  activeConversation: null,
  currentPage: 1,
  hasFetchedInitial: false,
  hasFetchedAll: false
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateConversations: (
      state,
      action: PayloadAction<{ conversations: Conversation[]; hasMore: boolean }>
    ) => {
      console.log("here")
      if(state.hasFetchedInitial === false) state.hasFetchedInitial = true
      state.conversations = 
        Array.from(new Set(
          [...state.conversations, ...action.payload.conversations].map(el =>
            JSON.stringify(el)
          )
        )).map(el => JSON.parse(el));
      state.currentPage += 1
    }
  }
});

export const { updateConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
