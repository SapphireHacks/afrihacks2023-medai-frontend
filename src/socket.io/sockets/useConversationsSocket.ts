import { useMemo, useEffect } from 'react';
import useSocket from '../useSocket';
import useListenForEvents from '../useListenForEvents';
import {
  updateConversations,
  unsetCreateNewConversation,
  updateActiveConversationId,
  updateIdOfChatToDelete,
  deleteConversation,
  updateLoading,
  StoreConversation,
  resetShouldClearConversations
} from '@/redux/conversations/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import toast from 'react-hot-toast';

export default function useConversationsSocket() {
  const {
    shouldCreateNewConversation,
    hasFetchedAll,
    hasFetchedInitial,
    idOfConversationToDelete,
    shouldClearConversations
  } = useAppSelector(store => store.conversations);
  const events = useMemo(
    () => ['new', 'getMany', 'deleteAll', 'deleteOne'],
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
        dispatch(updateLoading(false))
      },
      getMany: (data: {
        conversations: StoreConversation[];
        hasMore: boolean;
      }) => {
        const { conversations, hasMore } = data;
        dispatch(
          updateConversations({
            conversations,
            hasMore
          })
        );
      },
      deleteAll: (data: any) => {
        dispatch(resetShouldClearConversations());
        toast.success(data.message);
      },
      deleteOne: (data: any) => {
        dispatch(deleteConversation(data.conversationId));
        dispatch(updateIdOfChatToDelete(null));
        toast.success(data.message);
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

  useEffect(() => {
    if (shouldClearConversations) {
      conversationsSocket.emit('deleteAll');
    }
  }, [conversationsSocket, dispatch, shouldClearConversations]);

  return conversationsSocket;
}
