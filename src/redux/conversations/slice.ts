import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, } from '@/types/chat';

export interface ConversationsState {
  currentPage: number;
  conversations: Conversation[];
  activeConversationId: string | null;
  hasFetchedInitial: boolean;
  hasFetchedAll: boolean;
  loading: boolean;
  shouldCreateNewConversation: boolean;
  idOfConversationToDelete: string | null
}

const initialState: ConversationsState = {
  conversations: [],
  activeConversationId: null,
  currentPage: 1,
  hasFetchedInitial: false,
  hasFetchedAll: false,
  loading: false,
  shouldCreateNewConversation: false,
  idOfConversationToDelete: null
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateConversations: (
      state,
      action: PayloadAction<{ conversations: Conversation[]; hasMore: boolean }>
    ) => {
      if (state.hasFetchedInitial === false) state.hasFetchedInitial = true;
      state.conversations = Array.from(
        new Set(
          [...state.conversations, ...action.payload.conversations].map(el =>
            JSON.stringify(el)
          )
        )
      ).map(el => JSON.parse(el)).map((convo: Conversation) => {
        console.log(convo._id, convo.toString())
        return ({
        ...convo,
        messages: Array.isArray(convo.messages) ? convo.messages : [],
        hasOlderMessages: convo.hasOlderMessages, 
      })
      });
      state.currentPage += 1;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    createNewConversation: state => {
      state.shouldCreateNewConversation = true;
    },
    unsetCreateNewConversation: state => {
      state.shouldCreateNewConversation = false;
    },
    updateActiveConversationId: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
    },
    updateIdOfChatToDelete: (state, action: PayloadAction<string | null>) => {
      state.idOfConversationToDelete = action.payload
    },
    deleteConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter(conv => conv._id !== action.payload)
    },
    clearConversations: (state) => {
      state.conversations = []
    }
  }
});

export const {
  updateConversations,
  updateLoading,
  createNewConversation,
  unsetCreateNewConversation,
  updateActiveConversationId,
  updateIdOfChatToDelete,
  deleteConversation,
  clearConversations,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
