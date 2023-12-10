import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '@/types/chat';

export interface StoreConversation extends Conversation {
    messages?: Message[];
    hasOlderMessages: boolean;
    hasFetchedInitialMessages: boolean;
    page: number
}

export interface ConversationsState {
  currentPage: number;
  conversations: StoreConversation[];
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
      action: PayloadAction<{ conversations: StoreConversation[]; hasMore: boolean }>
    ) => {
      if (state.hasFetchedInitial === false) state.hasFetchedInitial = true;
      state.conversations = Array.from(
        new Set(
          [...state.conversations, ...action.payload.conversations].map(el =>
            JSON.stringify(el)
          )
        )
      ).map(el => JSON.parse(el)).map((convo: StoreConversation) => {
        return ({
        ...convo,
        messages: Array.isArray(convo.messages) ? convo.messages : [],
        hasOlderMessages: typeof convo.hasOlderMessages === "boolean" ? convo.hasOlderMessages : true, 
        hasFetchedInitialMessages: typeof convo.hasFetchedInitialMessages === "boolean" ? convo.hasFetchedInitialMessages : false,
        page: typeof convo.page === "number" ? convo.page : 1
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
    },
    appendSingleMessageToConversation: (state, action: PayloadAction<Message>) => {
      state.conversations = state.conversations.map(convo => {
        if(convo._id === action.payload.conversation){
          return {
            ...convo, messages: [...(convo?.messages  || []), action.payload]
          }
        }else return convo
      })
    },
    appendMultipleMessagesToConversation: (state, action: PayloadAction<{
      conversationId: string,
      messages: Message[],
      hasMore: boolean, 
      page?: number
    }>) => {
      console.log(action.payload)
      state.conversations = state.conversations.map(convo => {
        if(convo._id === action.payload.conversationId){
          console.log(convo)
          return {
            ...convo, 
            messages: [ ...action.payload.messages, ...(convo?.messages  || []),],
            hasOlderMessages: action.payload.hasMore === true,
            page: typeof action.payload.page === "number" ? action.payload.page : convo.page,
            hasFetchedInitialMessages: true,
          }
        }else return convo
      })
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
  appendSingleMessageToConversation,
  appendMultipleMessagesToConversation,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
