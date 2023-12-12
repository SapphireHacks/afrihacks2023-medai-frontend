import {
  Box,
  Flex,
  IconButton,
  Text,
  Textarea,
  keyframes
} from '@chakra-ui/react';
import useSpeechRecognition from '@/utils/speechRecognition';
import { useState } from 'react';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';

const HospitalChatInput = ({
  message,
  setMessage,
  fetchHospitals,
  setMessages,
  messages
}: {
  message: string;
  setMessage: (message: string) => void;
  fetchHospitals: (location: string) => void;
  setMessages: (
    callback: (
      prevMessages: { sender: 'AI' | 'USER'; content: string }[]
    ) => { sender: 'AI' | 'USER'; content: string }[]
  ) => void;
  messages: { sender: 'AI' | 'USER'; content: string }[];
}) => {
  const {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition(setMessage, () => message);

  return (
    <Box position="absolute" bottom="0" w="calc(100% - 4rem)" h="20%">
      <Flex
        pos="relative"
        alignItems="center"
        gap={{ base: '0.5rem', md: '1rem' }}
        borderWidth="1px"
        borderColor="text.100"
        borderRadius="10px"
        maxH="92px"
        p={{ base: '0.8rem', md: '1.2rem' }}
        _focusWithin={{ borderColor: 'primary.900' }}
      >
        <Textarea
          //   onKeyDown={e => {
          //     if (e.key === 'Enter') {
          //       fetchHospitals(message);
          //       setMessage('');
          //     }
          //   }}
          placeholder="Message Doc MedAI"
          p={{ base: '0.5rem', md: '1rem' }}
          lineHeight="150%"
          overflowY="scroll"
          fontSize={{ base: 'base', md: 'lg' }}
          border="none"
          _focusVisible={{ outline: '0' }}
          value={message}
          resize="none"
          color="#676767"
          onChange={({ target: { value } }) => {
            setMessage(value);

            // console.log(message);
          }}
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
        <Flex align="end" gap="4px">
          <Box
            as="span"
            display="block"
            borderRadius="1px"
            width="10px"
            height="10px"
          />
          {hasRecognitionSupport && (
            <IconButton
              animation={listening ? `${pulse} infinite 1500ms linear` : ''}
              icon={<MicIcon />}
              aria-label="Send message"
              p="1.4rem"
              bg={listening ? 'primary.900' : 'none'}
              color={listening ? 'white.main' : 'currentcolor'}
              h="unset"
              borderRadius="1.6rem"
              _hover={{
                bg: listening ? 'primary.900' : 'white.600',
                color: 'white.main'
              }}
              cursor="pointer"
              onClick={listening ? stopListening : startListening}
            />
          )}
        </Flex>
        <IconButton
          disabled={message.length === 0}
          opacity={message.length === 0 ? '0.5' : '1'}
          onClick={() => {
            fetchHospitals(message);
            setMessage('');
            setMessages(
              (prevMessages: { sender: 'AI' | 'USER'; content: string }[]) => [
                ...prevMessages,
                { sender: 'USER', content: message }
              ]
            );
          }}
          icon={<SendIcon />}
          aria-label="Send message"
          bg={message.length > 0 ? 'primary.800' : 'white.600'}
          color={message.length > 0 ? 'white.main' : 'currentcolor'}
          p="1.5rem"
          h="unset"
          w="unset"
          borderRadius="1.6rem"
          _hover={
            message.length > 0
              ? { bg: 'primary.900', color: 'white.main' }
              : { bg: 'white.600' }
          }
          cursor={message.length === 0 ? 'not-allowed' : 'pointer'}
        />
      </Flex>
      <Text
        fontSize={{ base: 'md', md: 'base' }}
        color="text.300"
        mt="0.5rem"
        textAlign="center"
      >
        Doc MedAI can make mistakes. Consider checking important information.
      </Text>
    </Box>
  );
};

export default HospitalChatInput;

export const pulse = keyframes`  
	0% {
		transform: scale(0.85);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.85);
	}
`;
