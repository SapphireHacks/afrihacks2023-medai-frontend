
import { Flex, Textarea, IconButton } from '@chakra-ui/react';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';
import { useState } from 'react';
import useSpeechRecognition from '@/utils/speechRecognition';

export default function ChatInput(){

    const [message, setMessage] = useState('');
    const {
      text,
      listening,
      startListening,
      stopListening,
      hasRecognitionSupport
    } = useSpeechRecognition(setMessage, () => message);

  return (
       <Flex
          pos="relative"
          alignItems="center"
          gap={{"2xs": "0.5rem", md: "1rem"}}
          borderWidth="1px"
          borderColor="text.100"
          borderRadius="10px"
          maxH="92px"
          p={{"2xs": "0.8rem", md: "1.6rem"}}
        >
          <Textarea
            placeholder="Message Doc MedAI"
            p={{"2xs": "0.5rem", md: "1rem"}}
            lineHeight="150%"
            overflowY="scroll"
            fontSize={{"2xs": "base", md:"lg"}}
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
  )
}