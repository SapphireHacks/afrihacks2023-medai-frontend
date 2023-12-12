import { Flex, List, ListItem, VStack, Text } from '@chakra-ui/react';
import HistoryItem from "./HistoryItem"
import { useAppSelector } from '@/redux/hooks';
import { useMemo } from "react";
import NotFound from "@/assets/icons/notFound";

export default function HistoryList() {
  const { conversations, searchedConversations, searchTerm } = useAppSelector(
    store => store.conversations
  );

  const shouldDisplaySearch = useMemo(() =>
   searchTerm.length > 0,
  [searchTerm])

  if(shouldDisplaySearch && searchedConversations.length <= 0){
    return(
      
      <Flex as={VStack} spacing="1.6rem" w="60%" mx="auto" flexDir="column" justify="center" align="center" textAlign="center">
        <NotFound/>
        <Text
          as="h2"
          fontSize={{ base: '2.4rem', md: '3.6rem' }}
          fontWeight="600"
        >
          Not Found
        </Text>
        <Text color="text.600" as="p" fontSize={{ base: '1.6rem', md: '2.4rem' }} fontWeight="400">
          We&apos;re sorry, we are unable to find the chat word you entered, please search for another chat.
        </Text>
      </Flex>
    )
  }
  
  return (
    <List as={VStack} 
      spacing="2.4rem" 
      w="87%" 
      mx="auto" 
      pb="4rem" 
      h={{ base: '100dvh', md: 'calc(100dvh-134px)' }}
      overflow="auto">
      {
        (shouldDisplaySearch ? searchedConversations : conversations).map(conv => (
          <ListItem w="100%" key={conv._id}>
            <HistoryItem conversation={conv} />
          </ListItem> 
        ))
      }
    </List>
  )
}
