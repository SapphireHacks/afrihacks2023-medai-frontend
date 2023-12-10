import { Text, Flex, Icon, Button, } from '@chakra-ui/react';
import CollapsableSearchBar from './CollapsableSearchBar';
import SearchIcon from '@/assets/icons/search';
import TrashIcon from '@/assets/icons/trash';

export default function DesktopHeader({
  hasNoHistory
}: {
  hasNoHistory: boolean
}) {
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
      <Text ml={hasNoHistory ? "auto": ""} as="h1" color="text.500"  fontSize="2.4rem" fontWeight="600">
        History
      </Text>
      <Flex flexGrow={hasNoHistory ?"": "1"} ml="auto" justify="end" gap="1rem" alignItems="center" w="fit-content">
        <CollapsableSearchBar disabled={hasNoHistory}>
          <Icon as={SearchIcon} />
        </CollapsableSearchBar>
        <Button disabled={hasNoHistory} opacity={hasNoHistory ? '0.4' : '1'} bg="transparent" position="static">
          <Icon as={TrashIcon} w="2rem" h="2rem" />
        </Button>
      </Flex>
    </Flex>
  );
}
