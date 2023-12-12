import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Icon, Flex, Box } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';
import TrashIcon from '@/assets/icons/trash';
import RightChevron from '@/assets/icons/rightChevron';
import NoHIstoryView from '@/components/history/NoHIstoryView';
import HistoryList from '@/components/history/HistoryList';
import DesktopHeader from '@/components/history/DesktopHeader';
import CollapsableSearchBar from '@/components/history/CollapsableSearchBar';
import ClearHistoryButton from '@/components/history/ClearHistoryButton';
import { useAppSelector } from '@/redux/hooks';
import LoadingState from '@/components/loading-state';
import useSearchConversations from "@/hooks/useSearchConversations";

const History = () => {
  const { hasFetchedInitial, conversations } = useAppSelector(
    store => store.conversations
  );

  return (
    <>
      <Head>
        <title>MedAI | History</title>
        <meta name="description" content="MedAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" h={{ base: '80dvh', md: '100dvh' }} overflow="hidden" w="100%">
        <DesktopHeader hasNoHistory={conversations.length === 0} />
        {hasFetchedInitial ? (
          <>
            {conversations.length === 0 ? <NoHIstoryView /> : <HistoryList />}
          </>
        ) : (
          <LoadingState />
        )}
      </Flex>
    </>
  );
};

function HeaderActionItems() {
  const { conversations } = useAppSelector(store => store.conversations);
  const search = useSearchConversations()
  return (
    <Flex alignItems="center" gap="1rem">
      <CollapsableSearchBar
        handleTyping={search}
        disabled={conversations.length === 0}
        childrenWhenExpanded={<Icon as={RightChevron} />}
      >
        <Icon as={SearchIcon} w="2rem" h="2rem" />
      </CollapsableSearchBar>
      <ClearHistoryButton disabled={conversations.length === 0}>
        <Box 
          bg="white.500" w="2rem" h="2rem"
          position="static"
          opacity={conversations.length === 0 ? '0.4' : '1'}
          as="button"
        >
         <Icon as={TrashIcon}  />
        </Box>
      </ClearHistoryButton>
    </Flex>
  );
}

History.requireAuth = true
History.getLayout = (page: any) => (
  <ProtectedLayout title="History" HeaderActionItems={HeaderActionItems}>
    {page}
  </ProtectedLayout>
);
History.requireAuth = true;
export default History;
