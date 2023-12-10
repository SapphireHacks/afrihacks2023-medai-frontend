import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '@/types/chat';

export interface StoreConversation extends Conversation {
  messages?: Message[];
  hasOlderMessages: boolean;
  hasFetchedInitialMessages: boolean;
  page: number;
}

export interface ConversationsState {
  currentPage: number;
  conversations: StoreConversation[];
  activeConversationId: string | null;
  hasFetchedInitial: boolean;
  hasFetchedAll: boolean;
  loading: boolean;
  shouldCreateNewConversation: boolean;
  idOfConversationToDelete: string | null;
  messageToSend: { content: string; conversationId: null | string } | null;
  shouldClearConversations: boolean
}

const initialState: ConversationsState = {
  conversations: [],
  activeConversationId: null,
  currentPage: 1,
  hasFetchedInitial: false,
  hasFetchedAll: false,
  loading: false,
  shouldCreateNewConversation: false,
  idOfConversationToDelete: null,
  messageToSend: null,
  shouldClearConversations: false
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateConversations: (
      state,
      action: PayloadAction<{
        conversations: StoreConversation[];
        hasMore: boolean;
      }>
    ) => {
      if (state.hasFetchedInitial === false) state.hasFetchedInitial = true;
      state.conversations = Array.from(
        new Set(
          [...state.conversations, ...action.payload.conversations].map(el =>
            JSON.stringify(el)
          )
        )
      )
        .map(el => JSON.parse(el))
        .map((convo: StoreConversation) => {
          return {
            ...convo,
            messages: Array.isArray(convo.messages) ? convo.messages : [],
            hasOlderMessages:
              typeof convo.hasOlderMessages === 'boolean'
                ? convo.hasOlderMessages
                : true,
            hasFetchedInitialMessages:
              typeof convo.hasFetchedInitialMessages === 'boolean'
                ? convo.hasFetchedInitialMessages
                : false,
            page: typeof convo.page === 'number' ? convo.page : 1
          };
        });
      state.currentPage += 1;
    },
    updateMessgeToSend: (
      state,
      action: PayloadAction<{
        conversationId: null | string;
        content: string;
      } | null>
    ) => {
      state.messageToSend = action.payload;
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
    updateActiveConversationId: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.activeConversationId = action.payload;
    },
    updateIdOfChatToDelete: (state, action: PayloadAction<string | null>) => {
      state.idOfConversationToDelete = action.payload;
    },
    deleteConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter(
        conv => conv._id !== action.payload
      );
    },
    clearConversations: state => {
      state.conversations = [];
      state.shouldClearConversations = true
    },
    resetShouldClearConversations: state => {
      state.shouldClearConversations = false
    },
    appendSingleMessageToConversation: (
      state,
      action: PayloadAction<Message>
    ) => {
      state.conversations = state.conversations.map(convo => {
        if (convo._id === action.payload.conversation) {
          return {
            ...convo,
            messages: [...(convo?.messages || []), action.payload]
          };
        } else return convo;
      });
    },
    appendMultipleMessagesToConversation: (
      state,
      action: PayloadAction<{
        conversationId: string;
        messages: Message[];
        hasMore: boolean;
        page?: number;
      }>
    ) => {
      state.conversations = state.conversations.map(convo => {
        if (convo._id === action.payload.conversationId) {
          return {
            ...convo,
            messages: [...action.payload.messages, ...(convo?.messages || [])],
            hasOlderMessages: action.payload.hasMore === true,
            page:
              typeof action.payload.page === 'number'
                ? action.payload.page
                : convo.page,
            hasFetchedInitialMessages: true
          };
        } else return convo;
      });
    },
    appendUserMessageAndAIResponseToConversation: (
      state,
      action: PayloadAction<{
        conversation: StoreConversation;
        messages: Message[];
      }>
    ) => {
      const { conversation, messages } = action.payload;
      const existingConversation = state.conversations.find(
        it => it._id === conversation._id
      );
      if (existingConversation) {
        state.conversations = state.conversations.map(convo => {
          if (convo._id === conversation._id)
            return {
              ...convo,
              messages: [
                ...(Array.isArray(convo.messages) ? convo.messages : []),
                ...messages
              ]
            };
          else return convo
        });
      } else {
        state.conversations = [
          {
            ...conversation,
            hasFetchedInitialMessages: true,
            hasOlderMessages: false,
            messages,
            page: 1
          },
          ...state.conversations
        ];
        if (state.activeConversationId === null)
          state.activeConversationId = conversation._id;
      }
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
  updateMessgeToSend,
  appendUserMessageAndAIResponseToConversation,
  resetShouldClearConversations,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
