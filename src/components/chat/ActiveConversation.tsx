import { Box, Text } from '@chakra-ui/react';
import ChatInput from '@/components/chat/ChatInput';
import Conversation from '@/components/chat/Conversation';
import { useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';

export default function ActiveConversation() {
  const { activeConversationId, conversations } = useAppSelector(
    store => store.conversations
  );
  const activeConversation = useMemo(() => {
    return conversations.find(it => it._id === activeConversationId);
  }, [conversations, activeConversationId]);

  return (
    <>
      {activeConversation && (
        <Box
          h="calc(100dvh-773.03)"
          pt={{ base: '0', md: '100px' }}
          overflow="auto"
        >
          <Conversation messages={activeConversation.messages} />
        </Box>
      )}
      <Box position="sticky" top="100%" bottom="0" w="100%" p="1.6rem">
        <ChatInput />
        <Text
          fontSize={{ base: 'md', md: 'base' }}
          color="text.300"
          mt="0.5rem"
          textAlign="center"
        >
          Doc MedAI can make mistakes. Consider checking important information.
        </Text>
      </Box>
    </>
  );
}
