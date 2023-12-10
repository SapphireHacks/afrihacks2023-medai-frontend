import { List, ListItem, VStack } from '@chakra-ui/react';
import HistoryItem from "./HistoryItem"
import { useAppSelector } from '@/redux/hooks';

export default function HistoryList() {
  const { conversations } = useAppSelector(
    store => store.conversations
  );

  return (
    <List as={VStack} spacing="2.4rem" w="87%" mx="auto" pb="4rem"  h={{ base: '100dvh', md: 'calc(100dvh-134px)' }} overflow="auto">
      {
        conversations.map(conv => (
          <ListItem w="100%" key={conv._id}>
            <HistoryItem conversation={conv} />
          </ListItem> 
        ))
      }
    </List>
  )
}
