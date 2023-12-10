import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Button, Icon, Flex } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';
import TrashIcon from '@/assets/icons/trash';
import RightChevron from '@/assets/icons/rightChevron';
import NoHIstoryView from '@/components/history/NoHIstoryView';
import HistoryList from '@/components/history/HistoryList';
import DesktopHeader from '@/components/history/DesktopHeader';
import CollapsableSearchBar from '@/components/history/CollapsableSearchBar';
import useConversationsSocket from '@/socket.io/sockets/useConversationsSocket';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Socket } from 'socket.io-client';
import LoadingState from '@/components/loading-state';

const History = () => {
  const { hasFetchedInitial, conversations } = useAppSelector(
    store => store.conversations
  );
  const conversationsSocket = useConversationsSocket();

  useEffect(() => {
    if (hasFetchedInitial === false) {
      (conversationsSocket as Socket).emit('getMany', { page: 1, limit: 100 });
    }
  }, [conversationsSocket, hasFetchedInitial]);

  return (
    <>
      <Head>
        <title>MedAI | History</title>
        <meta name="description" content="MedAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" h={{ base: '80dvh', md: '100dvh' }} w="100%">
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
  const { hasFetchedInitial, conversations } = useAppSelector(
    store => store.conversations
  );
  return (
    <Flex alignItems="center">
      <CollapsableSearchBar
        disabled={conversations.length === 0}
        childrenWhenExpanded={<Icon as={RightChevron} />}
      >
        <Icon as={SearchIcon} w="2rem" h="2rem" />
      </CollapsableSearchBar>
      <Button
        bg="transparent"
        position="static"
        opacity={conversations.length === 0 ? '0.4' : '1'}
      >
        <Icon as={TrashIcon} w="2rem" h="2rem" />
      </Button>
    </Flex>
  );
}

History.getLayout = (page: any) => (
  <ProtectedLayout title="History" HeaderActionItems={HeaderActionItems}>
    {page}
  </ProtectedLayout>
);
History.requireAuth = true;
export default History;
