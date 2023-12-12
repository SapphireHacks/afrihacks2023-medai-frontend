import { Text, Flex, Icon } from '@chakra-ui/react';
import CollapsableSearchBar from './CollapsableSearchBar';
import SearchIcon from '@/assets/icons/search';
import TrashIcon from '@/assets/icons/trash';
import ClearHistoryButton from './ClearHistoryButton';
import useSearchConversations from "@/hooks/useSearchConversations";

export default function DesktopHeader({
  hasNoHistory
}: {
  hasNoHistory: boolean
}) {
  const search = useSearchConversations()
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
        <CollapsableSearchBar handleTyping={search} disabled={hasNoHistory} childrenWhenExpanded={<Icon as={SearchIcon}  w="2rem" h="2rem"  />}>
          <Flex justify="center" alignItems="stretch" bg="white.500" p="1.2rem" borderRadius="8px">
            <Icon as={SearchIcon}  w="2rem" h="2rem"  /></Flex>
        </CollapsableSearchBar>
        <ClearHistoryButton disabled={hasNoHistory}>
           <Flex justify="center" alignItems="center" bg="white.500" p="1rem" borderRadius="8px" as="button" cursor="pointer" opacity={hasNoHistory ? '0.4' : '1'} position="static"> 
              <Icon as={TrashIcon} w="2rem" h="2rem" />
            </Flex>
        </ClearHistoryButton>
      </Flex>
    </Flex>
  );
}
