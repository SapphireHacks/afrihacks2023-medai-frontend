import { Box, Text } from '@chakra-ui/react';
import ChatInput from '@/components/chat/ChatInput';
import Conversation from '@/components/chat/Conversation';
import { useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import Loader from "@/components/loading-state"

export default function ActiveConversation() {
  const { activeConversationId, conversations, messageToSend, loading } = useAppSelector(
    store => store.conversations
  );
  const { data } = useAppSelector(
    store => store.user
  );
  const activeConversation = useMemo(() => {
    return conversations.find(it => it._id === activeConversationId);
  }, [conversations, activeConversationId]);

  if(loading) return <Loader/>
  return (
    <>
      <Box
        h="calc(100dvh - 77.3px)"
        pt={{ base: '0', md: '100px' }}
        overflow="auto"
      >
        { activeConversation ? 
          <Conversation user={data} messageToSend={messageToSend} messages={activeConversation.messages || []} /> : 
          <Conversation user={data} messageToSend={messageToSend} messages={[{
            role: "assistant", _id: "0", content: `Hello, How may I assist you today?`,
            conversationOwner: "", conversation: "",
          }]} /> }
       
        </Box>
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
