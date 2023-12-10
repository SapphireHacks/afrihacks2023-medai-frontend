import { useMemo, useEffect } from 'react';
import useSocket from '../useSocket';
import useListenForEvents from '../useListenForEvents';
import {
  appendSingleMessageToConversation,
  appendMultipleMessagesToConversation,
  appendUserMessageAndAIResponseToConversation,
  updateMessgeToSend
} from '@/redux/conversations/slice';
import { Message } from '@/types/chat';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function useMessagesSocket() {
  const { activeConversationId, conversations, messageToSend } = useAppSelector(
    store => store.conversations
  );

  const activeConversation = useMemo(() => {
    return conversations.find(it => it._id === activeConversationId);
  }, [activeConversationId, conversations]);

  const events = useMemo(
    () => ['new', 'getMany', 'deleteMany', 'deleteOne', 'initMessage'],
    []
  );
  const { socket: messagesSocket, disconnect } = useSocket({
    namespace: '/messages'
  });
  const dispatch = useAppDispatch();
  const handlers = useMemo(() => {
    return {
      new: (data: any) => {
        dispatch(appendUserMessageAndAIResponseToConversation(data));
        dispatch(updateMessgeToSend(null));
      },
      getMany: (data: any) => {
        dispatch(appendMultipleMessagesToConversation(data));
      },
      initMessage: (data: { message: Message }) => {
        dispatch(appendSingleMessageToConversation(data.message));
      }
    };
  }, [dispatch]);

  useListenForEvents(messagesSocket, {
    events,
    handlers
  });

  useEffect(() => {
    if (
      activeConversation &&
      activeConversation.hasFetchedInitialMessages === false
    ) {
      messagesSocket.emit('getMany', {
        conversationId: activeConversation._id,
        page: activeConversation.page,
        limit: 100,
        sort: '-createdAt'
      });
    }
  }, [dispatch, messagesSocket, activeConversation]);

  useEffect(() => {
    if (
      activeConversation &&
      activeConversation.hasFetchedInitialMessages === true &&
      Array.isArray(activeConversation.messages) &&
      activeConversation.messages.length === 0
    ) {
      messagesSocket.emit('initMessage', {
        conversationId: activeConversation._id
      });
    }
  }, [messagesSocket, activeConversation]);

  useEffect(() => {
    if (messageToSend !== null) {
      messagesSocket.emit('new', {
        conversationId: messageToSend.conversationId,
        newMessage: { content: messageToSend.content }
      });
    }
  }, [messagesSocket, messageToSend]);

  return messagesSocket;
}
