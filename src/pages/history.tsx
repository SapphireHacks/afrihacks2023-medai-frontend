import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Button, Icon, Flex } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';
import TrashIcon from '@/assets/icons/trash';
import HistoryList from '@/components/history/HistoryList';
import DesktopHeader from '@/components/history/DesktopHeader';

const History = () => {
  return (
    <>
      <Head>
        <title>MedAI | History</title>
        <meta name="description" content="MedAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" h="100dvh" w="100%">
        <DesktopHeader />
        <HistoryList />
      </Flex>
    </>
  );
};

function HeaderActionItems() {
  return (
    <>
      <Button>
        <Icon as={SearchIcon} w="2rem" h="2rem" />
      </Button>
      <Button>
        <Icon as={TrashIcon} w="2rem" h="2rem" />
      </Button>
    </>
  );
}

History.getLayout = (page: any) => (
  <ProtectedLayout title="History" HeaderActionItems={HeaderActionItems}>
    {page}
  </ProtectedLayout>
);
History.requireAuth = true;
export default History;
