import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import ChatInput from '@/components/chat/ChatInput';
import Conversation from '@/components/chat/Conversation';
import EditIcon from '@/assets/icons/edit';
import CreateNewChatButton from '@/components/buttons/CreateNewChatButton';

const Home = () => {
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
        <Box h="calc(100dvh-773.03)" pt={{ 'base': '0', md: '100px' }}overflow="auto">
          <Conversation messages={[]} />
        </Box>
        <Box position="sticky" top="100%" bottom="0" w="100%" p="1.6rem">
          <ChatInput />
          <Text
            fontSize={{ 'base': 'md', md: 'base' }}
            color="text.300"
            mt="0.5rem"
            textAlign="center"
          >
            Doc MedAI can make mistakes. Consider checking important
            information.
          </Text>
        </Box>
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
