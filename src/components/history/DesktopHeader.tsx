import { Text, Flex, Icon, Button, } from '@chakra-ui/react';
import CollapsableSearchBar from './CollapsableSearchBar';
import SearchIcon from '@/assets/icons/search';
import TrashIcon from '@/assets/icons/trash';

export default function DesktopHeader() {
  return (
    <Flex
      alignItems="center"
      justify="space-between"
      display={{ base: 'none', md: 'flex' }}
      pt="5.6rem"
      pb="3.2rem"
      w="87%"
      position="relative"
      mx="auto"
    >
      <Text as="h1" color="text.500" fontSize="2.4rem" fontWeight="600">
        History
      </Text>
      <Flex flexGrow="1" justify="end" alignItems="center" w="fit-content">
        <CollapsableSearchBar>
          <Icon as={SearchIcon} />
        </CollapsableSearchBar>
        <Button bg="transparent" position="static">
          <Icon as={TrashIcon} w="2rem" h="2rem" />
        </Button>
      </Flex>
    </Flex>
  );
}
