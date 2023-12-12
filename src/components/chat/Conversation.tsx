import { Message } from '@/types/chat';
import { UserBubble, AIBubble, AIBubbleLoading } from './ChatBubbles';
import { Flex } from '@chakra-ui/react';

import useSortMessages from '@/hooks/useSortMessages';
import { User } from '@/redux/user/slice';

export default function Conversation({
  messages,
  messageToSend,
  user
}: {
  messages: Message[];
  messageToSend: {
    content: string;
    conversationId: string | null;
  } | null;
  user: User['data'] | null;
}) {
  const sortedMessages = useSortMessages(messages);
  return (
    <Flex flexDirection="column" gap="16px" w="100%" position="relative">
      {sortedMessages.map(msg => {
        if (msg.role === 'user')
          return <UserBubble key={msg._id} user={user} content={msg.content} />;
        else return <AIBubble key={msg._id} content={msg.content} />;
      })}
      {messageToSend !== null && (
        <UserBubble user={user} content={messageToSend.content} />
      )}
      {messageToSend !== null && <AIBubbleLoading />}
    </Flex>
  );
}
