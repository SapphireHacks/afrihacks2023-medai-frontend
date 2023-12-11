import ChatInput from '@/components/chat/ChatInput';
import { Box, Text } from '@chakra-ui/react';

export default function HomePageChatInput(){
  return (
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
  )
}