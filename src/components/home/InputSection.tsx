import ChatInput from '@/components/chat/ChatInput';
import { Box, Text } from '@chakra-ui/react';
import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateMessgeToSend } from "@/redux/conversations/slice"

export default function HomePageChatInput(){
  const dispatch = useAppDispatch()
  const { activeConversationId, messageToSend } = useAppSelector(store => store.conversations)
   const handleSendMessage = useCallback(
    (message: string) => {
      if(messageToSend !== null) return 
        dispatch(updateMessgeToSend({
          conversationId: activeConversationId,
          content: message,
        }))
    },
    [activeConversationId, messageToSend, dispatch]
  );
  return (
    <Box position="sticky" top="100%" bottom="0" w="100%" p="1.6rem">
      <ChatInput onSubmit={handleSendMessage} disabledSubmit={messageToSend === null} />
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