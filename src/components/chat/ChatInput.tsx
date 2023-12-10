import { Flex, Textarea, IconButton } from '@chakra-ui/react';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';
import { useState, useCallback } from 'react';
import useSpeechRecognition from '@/utils/speechRecognition';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateMessgeToSend } from "@/redux/conversations/slice"

export default function ChatInput() {
  const dispatch = useAppDispatch()
  const { activeConversationId, messageToSend } = useAppSelector(store => store.conversations)
  const [message, setMessage] = useState('');
  const {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition(setMessage, () => message);

  const handleSendMessage = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (message.length === 0 || messageToSend !== null) return;
      if ((e.key && e.key === 'Enter') || !e.key) {
        e.preventDefault();
        dispatch(updateMessgeToSend({
          conversationId: activeConversationId,
          content: message,
        }))
        setMessage("")
      }
    },
    [message, activeConversationId, messageToSend, dispatch]
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
      p={{ base: '0.8rem', md: '1.6rem' }}
    >
      <Textarea
        onKeyDown={handleSendMessage}
        placeholder="Message Doc MedAI"
        p={{ base: '0.5rem', md: '1rem' }}
        lineHeight="150%"
        overflowY="scroll"
        fontSize={{ base: 'base', md: 'lg' }}
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
        disabled={message.length === 0 || messageToSend !== null}
        opacity={message.length === 0 || messageToSend !== null ? "0.5" : "1"}
        onClick={handleSendMessage}
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
  );
}
