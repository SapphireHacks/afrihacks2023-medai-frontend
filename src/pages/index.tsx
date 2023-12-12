import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Flex, Icon } from '@chakra-ui/react';
import EditIcon from '@/assets/icons/edit';
import CreateNewChatButton from '@/components/buttons/CreateNewChatButton';
import LoadingState from '@/components/loading-state';
import Hero from '@/components/home/Hero';
import InputSection from '@/components/home/InputSection';
import AppHead from '@/components/layouts/components/Head';
import Conversation from '@/components/chat/Conversation';
import { useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';

import Loader from '@/components/loading-state';
import HospitalSearch from '@/components/hospital-search';
const Home = () => {
  const {
    activeConversationId,
    conversations,
    messageToSend,
    loading,
    shouldCreateNewConversation,
  } = useAppSelector(store => store.conversations);
  const { data } = useAppSelector(store => store.user);
  const activeConversation = useMemo(() => {
    return conversations.find(it => it._id === activeConversationId);
  }, [conversations, activeConversationId]);
  const showHospitalSearch = useAppSelector(
    state => state.hospitalSearch.showHospitalSearch
  );

  return (
    <>
      <AppHead title="MedAI" />
     { (shouldCreateNewConversation || loading || (messageToSend !== null && activeConversationId === null))
      && <Loader /> }
      {showHospitalSearch ? (
        <HospitalSearch />
      ) : (
        <Flex
          flexDir="column"
          h={{ base: 'calc(100vh - 100px)', md: '100dvh' }}
          w="100%"
          px="3.5%"
          mx="auto"
          overflow="hidden"
        >
         { 
          <Flex
            flexDir="column"
            justify="start"
            align="center"
            gap="8rem"
            h="calc(100dvh - 77.3px)"
            pt={{ base: '0', md: '100px' }}
            overflow="auto"
          >
            {activeConversation ? (
              <Conversation
                user={data}
                messageToSend={messageToSend}
                messages={activeConversation.messages || []}
              />
            ) : (
              <Hero />
            )}
          </Flex>}
          {!showHospitalSearch && <InputSection />}
        </Flex>
      )}
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
