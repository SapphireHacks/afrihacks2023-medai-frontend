import { List, ListItem, VStack } from '@chakra-ui/react';
import HistoryItem from "./HistoryItem"

export default function HistoryList() {
  return (
    <List as={VStack} spacing="2.4rem" w="87%" mx="auto">
      <ListItem w="100%">
        <HistoryItem/>
      </ListItem>
      <ListItem w="100%">
        <HistoryItem/>
      </ListItem>
      <ListItem w="100%">
        <HistoryItem/>
      </ListItem>
      <ListItem w="100%">
        <HistoryItem/>
      </ListItem>
    </List>
  )
}
