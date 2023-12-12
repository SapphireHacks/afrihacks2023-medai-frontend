import ChatInput from '@/components/chat/ChatInput';
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CommunityBg from '@/assets/images/community-header-bg.png';
import Image from 'next/image';
import CardAvatar from '@/assets/images/community-card-avatar.png';
import { useEffect, useState } from 'react';
import useAxios from '@/hooks/use-axios';
import urls from '@/services/urls';
import LoadingState from '@/components/loading-state';

const SingleCommunity = () => {
  const router = useRouter();
  const { loading, makeRequest } = useAxios();
  const { communityId } = router.query;
  const [community, setCommunity] = useState({} as any);

  const fetchCommunity = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    const result = await makeRequest({
      url: urls.getCommunityById(communityId as string),
      method: 'get',
      token: storedUser?.token
    });
    if (result && result.status === 'success') {
      setCommunity(result.data);
    }
  };

  useEffect(() => {
    if (!communityId) return;
    fetchCommunity();
  }, []);

  if (loading) return <LoadingState />;

  const { name, primaryCoverImage, secondaryCoverImage } =
    community?.community || {};

  return (
    <Box
      h="100vh"
      overflowY="auto"
      p="2rem"
      py={{
        base: '0',
        md: '2rem'
      }}
      sx={{
        '::-webkit-scrollbar': {
          width: '10px'
        },
        '::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '6px'
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'darkgray'
        }
      }}
    >
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
          src={primaryCoverImage !== '' ? primaryCoverImage : CommunityBg}
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
              src={
                secondaryCoverImage !== '' ? secondaryCoverImage : CardAvatar
              }
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
            {name}
          </Text>
        </Flex>
      </Box>
      <Box py="1.6rem" position="absolute" bottom="0" width="calc(100% - 4rem)">
        <ChatInput onSubmit={(message) => console.log(message)} />
      </Box>
    </Box>
  );
};

SingleCommunity.requireAuth = true;
SingleCommunity.getLayout = (page: any) => (
  <ProtectedLayout title="Community">{page}</ProtectedLayout>
);
export default SingleCommunity;
