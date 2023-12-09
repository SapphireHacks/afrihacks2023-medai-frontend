import { Box, Text, Flex, Textarea, IconButton } from '@chakra-ui/react';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';
import { useState } from 'react';
import useSpeechRecognition from '@/utils/speechRecognition';

const HomePage = () => {
  const [message, setMessage] = useState('');
  const {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition(setMessage, () => message);

  return (
    <Flex flexDir="column" h="100vh" w="100%">
      <Box h="80%">{text}</Box>
      <Box h="20%">
        <Flex
          pos="relative"
          alignItems="center"
          gap="1rem"
          borderWidth="1px"
          borderColor="text.100"
          borderRadius="0.5rem"
          p="1rem"
          mb="0.5rem"
        >
          <Textarea
            placeholder="Message Doc MedAI"
            h="4rem"
            overflowY="scroll"
            maxH="10rem"
            fontSize="lg"
            border="none"
            _focus={{ outline: 'none' }}
            value={message}
            onChange={e => setMessage(e.target.value)}
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
            h="4rem"
            w="4rem"
            p="1rem"
            bg="white.600"
          />

          {hasRecognitionSupport && (
            <IconButton
              // to do: change icon when listening, need recording icon
              icon={listening ? <SendIcon /> : <MicIcon />}
              aria-label="Send message"
              h="4rem"
              w="4rem"
              bg="none"
              onClick={listening ? stopListening : startListening}
            />
          )}
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
