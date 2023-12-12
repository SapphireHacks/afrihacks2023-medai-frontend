import { Flex, Textarea, IconButton, Box, keyframes } from '@chakra-ui/react';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';
import { useState, useCallback } from 'react';
import useSpeechRecognition from '@/utils/speechRecognition';


export const pulse = keyframes`  
	0% {
		transform: scale(0.85);
		// box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		// box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.85);
		// box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`;

export default function ChatInput({ onSubmit, disabledSubmit, isOnline }: {
  onSubmit: (message: string) => void
  disabledSubmit?: boolean
  isOnline?: boolean
}) {
  const [message, setMessage] = useState('');
  const {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition(setMessage, () => message);

  const handleSubmit = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (message.length === 0) return;
      if ((e.key && e.key === 'Enter') || !e.key) {
        e.preventDefault();
        console.log('done')
        onSubmit(message)
        setMessage("")
      }
    },
    [message]
  );

  return (
    <Flex
      pos="relative"
      alignItems="center"
      gap={{ base: '0.5rem', md: '1rem' }}
      borderWidth="1px"
      borderColor="text.100"
      borderRadius="10px"
      maxH="92px"
      p={{ base: '0.8rem', md: '1.2rem' }}
      _focusWithin={{ borderColor: "primary.900"}}
    >
      <Textarea
        onKeyDown={handleSubmit}
        placeholder="Message Doc MedAI"
        p={{ base: '0.5rem', md: '1rem' }}
        lineHeight="150%"
        overflowY="scroll"
        fontSize={{ base: 'base', md: 'lg' }}
        border="none"
        _focusVisible={{ outline: '0'}}
        value={message}
        resize="none"
        color="#676767"
        onChange={({ target: { value } }) => setMessage(value)}
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
        <Box as="span"
          display="block"
          borderRadius="1px"
          width="10px"
          height="10px"
          bg={isOnline ? "red" : "green"} />
        {hasRecognitionSupport && (
          <IconButton
            animation={listening ? `${pulse} infinite 1500ms linear` : ""}
            icon={<MicIcon />}
            aria-label="Send message"
            p="1.4rem"
            bg={listening ? "primary.900" : "none"}
            color={listening ? "white.main" : "currentcolor"}
            h="unset"
            borderRadius="1.6rem"
            _hover={{ bg: listening ? "primary.900" : "white.600", color: "white.main" }}
            cursor="pointer"
            onClick={listening ? stopListening : startListening}
          />
        )}
      </Flex>
      <IconButton
        disabled={message.length === 0}
        opacity={message.length === 0 ? "0.5" : "1"}
        onClick={handleSubmit}
        icon={<SendIcon />}
        aria-label="Send message"
        bg="white.600"
        p="1.5rem"
        h="unset"
        w="unset"
        borderRadius="1.6rem"
        _hover={message.length > 0 ? { bg: "primary.900", color: "white.main" } : { bg: "white.600"}}
        cursor={message.length === 0 ? "not-allowed" : "pointer"}
      />
    </Flex>
  );
}
