import ChatInput from '@/components/chat/ChatInput';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CommunityBg from '@/assets/images/community-header-bg.png';
import Image from 'next/image';
import CardAvatar from '@/assets/images/community-card-avatar.png';

const SingleCommunity = () => {
  const router = useRouter();
  const { communityId } = router.query;

  return (
    <Box h="100%" p="2rem">
      <Box
        h="4rem"
        mb="3rem"
        textAlign="center"
        display={{
          base: 'none',
          md: 'block'
        }}
      >
        <Text as="h2" fontSize="2xl" fontWeight="550">
          Community
        </Text>
      </Box>
      <Box h="20%" w="100%" pos="relative" borderRadius="0.5rem">
        <Image
          src={CommunityBg}
          alt="Community header"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '0.5rem'
          }}
        />
        <Flex
          alignItems="flex-end"
          gap="1rem"
          pos="absolute"
          bottom="0"
          left="0"
          right="0"
          h="5rem"
          bg="rgba(255, 255, 255, 0.5)"
          pl="4rem"
          pb="2rem"
        >
          <Box h="6rem" w="6rem">
            <Image
              src={CardAvatar}
              alt="Community Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '1rem'
              }}
            />
          </Box>
          <Text fontSize="lg" fontWeight="550" mb="-.5rem">
            Health and Lifestyle{' '}
          </Text>
        </Flex>
      </Box>
      <Box py="1.6rem" position="absolute" bottom="0" width="calc(100% - 4rem)">
        <ChatInput />
      </Box>
    </Box>
  );
};

SingleCommunity.requireAuth = true;
SingleCommunity.getLayout = (page: any) => (
  <ProtectedLayout title="Community">{page}</ProtectedLayout>
);
export default SingleCommunity;
