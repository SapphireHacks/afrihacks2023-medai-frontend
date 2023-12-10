import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Flex, Icon } from '@chakra-ui/react';
import ActiveConversation from '@/components/chat/ActiveConversation';
import EditIcon from '@/assets/icons/edit';
import CreateNewChatButton from '@/components/buttons/CreateNewChatButton';
import LoadingState from '@/components/loading-state';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

const Home = () => {
  const { shouldCreateNewConversation, activeConversationId } = useAppSelector(
    store => store.conversations
  );
  return (
    <>
      <Head>
        <title>MedAI</title>
        <meta name="description" content="MedAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        flexDir="column"
        h="100dvh"
        w="100%"
        px="3.5%"
        mx="auto"
        overflow="hidden"
      >
        {shouldCreateNewConversation ? (
          <LoadingState />
        ) : (
          <ActiveConversation />
        )}
      </Flex>
    </>
  );
};

function HeaderActionItems() {
  return (
    <CreateNewChatButton>
      <Icon as={EditIcon} w="2rem" h="2rem" />
    </CreateNewChatButton>
  );
}

Home.getLayout = (page: any) => (
  <ProtectedLayout title="Doc MedAI" HeaderActionItems={HeaderActionItems}>
    {page}
  </ProtectedLayout>
);
Home.requireAuth = true;
export default Home;
