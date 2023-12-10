import { useMemo, useEffect } from 'react';
import useSocket from '../useSocket';
import useListenForEvents from '../useListenForEvents';
import {
  updateConversations,
  unsetCreateNewConversation,
  updateActiveConversationId,
  updateIdOfChatToDelete,
  deleteConversation,
  clearConversations,
} from '@/redux/conversations/slice';
import { Conversation } from '@/types/chat';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function useConversationsSocket() {
  const {
    shouldCreateNewConversation,
    hasFetchedAll,
    hasFetchedInitial,
    idOfConversationToDelete,
  } = useAppSelector(store => store.conversations);
  const events = useMemo(
    () => ['new', 'getMany', 'deleteMany', 'deleteOne'],
    []
  );
  const { socket: conversationsSocket, disconnect } = useSocket({
    namespace: '/conversations'
  });
  const dispatch = useAppDispatch();
  const handlers = useMemo(() => {
    return {
      new: (data: any) => {
        dispatch(
          updateConversations({
            conversations: [data.conversation],
            hasMore: hasFetchedAll === false
          })
        );
        dispatch(updateActiveConversationId(data.conversation._id));
      },
      getMany: (data: { conversations: Conversation[]; hasMore: boolean }) => {
        const { conversations, hasMore } = data;
        dispatch(
          updateConversations({
            conversations,
            hasMore
          })
        );
      },
      deleteMany: () => {
        dispatch(clearConversations());
      },
      deleteOne: (data: any) => {
        dispatch(deleteConversation(data.conversationId))
        dispatch(updateIdOfChatToDelete(null));
      }
    };
  }, [dispatch, hasFetchedAll]);

  useListenForEvents(conversationsSocket, {
    events,
    handlers
  });

  useEffect(() => {
    if (shouldCreateNewConversation) {
      conversationsSocket.emit('new', { title: 'DOC MedAI' });
    }
    dispatch(unsetCreateNewConversation());
  }, [shouldCreateNewConversation, dispatch, conversationsSocket]);

  useEffect(() => {
    if (hasFetchedInitial === false) {
      conversationsSocket.emit('getMany', { page: 1, limit: 100 });
    }
  }, [conversationsSocket, hasFetchedInitial]);

  useEffect(() => {
    if (idOfConversationToDelete !== null) {
      conversationsSocket.emit('deleteOne', {
        conversationId: idOfConversationToDelete
      });
    }
  }, [conversationsSocket, idOfConversationToDelete, dispatch]);

  return conversationsSocket;
}
