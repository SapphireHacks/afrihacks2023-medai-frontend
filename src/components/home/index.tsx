import { Box, Text, Flex } from '@chakra-ui/react';
import ChatInput from './ChatInput';
import Conversation from '@/components/chat/Conversation';

const HomePage = () => {
  return (
    <Flex flexDir="column" h="100dvh" w="100%" mx="auto" overflow="hidden">
      <Box
        h="calc(100dvh-773.03)"
        pt="100px"
        px="3.5%"
        overflow="auto"
        sx={{
          '::-webkit-scrollbar': {
            width: '10px'
          },
          '::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '6px'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: 'darkgray'
          }
        }}
      >
        <Conversation messages={[]} />
      </Box>
      <Box position="sticky" top="100%" bottom="0" w="100%" p="1.6rem">
        <ChatInput />
        <Text
          fontSize={{ '2xs': 'md', md: 'base' }}
          color="text.300"
          mt="0.5rem"
          textAlign="center"
        >
          Doc MedAI can make mistakes. Consider checking important information.
        </Text>
      </Box>
    </Flex>
  );
};

HomePage.requireAuth = true;
export default HomePage;
