import { useMemo } from 'react';
import useSocket from '../useSocket';
import useListenForEvents from '../useListenForEvents';

export default function useConversationsSocket() {
  const events = useMemo(
    () => ['new', 'getMany', 'deleteMany', 'deleteOne'],
    []
  );
  const [conversationsSocket, disconnect] = useSocket({
    namespace: '/conversations'
  });
  const handlers = useMemo(() => {
    return {
      new: (data: any) => {
        console.log(data, 'new');
      },
      getMany: (data: any) => {
        console.log(data, 'getMany');
      },
      deleteMany: (data: any) => {
        console.log(data, 'deleteMany');
      },
      deleteOne: (data: any) => {
        console.log(data);
      }
    };
  }, []);
  useListenForEvents(conversationsSocket, {
    events,
    handlers
  });
  return conversationsSocket;
}
