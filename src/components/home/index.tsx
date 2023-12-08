import { Box, Input, Text, Flex, Textarea, IconButton } from '@chakra-ui/react';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';

const HomePage = () => {
  return (
    <Flex flexDir="column" h="100vh" w="100%">
      <Box h="85%"></Box>
      <Box h="15%">
        <Flex
          pos="relative"
          alignItems="center"
          gap="1rem"
          borderWidth="1px"
          borderColor="text.100"
          borderRadius="0.5rem"
          p="1rem"
        >
          <Textarea
            placeholder="Message Doc MedAI"
            h="max-content"
            overflowY="scroll"
            maxH="10rem"
            fontSize="xl"
            border="none"
            _focus={{ outline: 'none' }}
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
          />
          <IconButton
            icon={<SendIcon />}
            aria-label="Send message"
            h="6rem"
            w="6rem"
            p="1rem"
            bg="white.600"
          />
          <IconButton
            icon={<MicIcon />}
            aria-label="Send message"
            h="6rem"
            w="6rem"
            bg="none"
          />
        </Flex>
        <Text fontSize="base" color="text.300" textAlign="center">
          Doc MedAI can make mistakes. Consider checking important information.
        </Text>
      </Box>
    </Flex>
  );
};

HomePage.requireAuth = true;
export default HomePage;
