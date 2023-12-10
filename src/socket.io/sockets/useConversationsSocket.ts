import { useMemo } from 'react';
import useSocket from '../useSocket';
import useListenForEvents from '../useListenForEvents';
import { updateConversations, Conversation } from '@/redux/conversations/slice';
import { useAppDispatch } from '@/redux/hooks';

export default function useConversationsSocket() {
  const events = useMemo(
    () => ['new', 'getMany', 'deleteMany', 'deleteOne'],
    []
  );
  const [conversationsSocket, disconnect] = useSocket({
    namespace: '/conversations'
  });
  const dispatch = useAppDispatch();
  const handlers = useMemo(() => {
    return {
      new: (data: any) => {
        console.log(data, 'new');
      },
      getMany: (data: {
        conversations: Conversation[]
        hasMore: boolean
      }) => {
        const { conversations, hasMore } = data
        dispatch(updateConversations({
          conversations, hasMore, 
        }))
      },
      deleteMany: (data: any) => {
        console.log(data, 'deleteMany');
      },
      deleteOne: (data: any) => {
        console.log(data);
      }
    };
  }, [dispatch]);
  
  useListenForEvents(conversationsSocket, {
    events,
    handlers
  });
  return conversationsSocket;
}
