import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useAxios from '@/hooks/use-axios';
import urls from '@/services/urls';
import LoadingState from '@/components/loading-state';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCommunities } from "@/redux/communities/slice";
import { Community } from "@/types";
import CommunityChatInput from "@/components/community/CommunityChatInput";
import DesktopHeader from "@/components/community/DesktopHeader";
import CommunityChatHeading from "@/components/community/CommunityChatHeading";
import CommunityConversation from "@/components/community/CommunityConversation";

const SingleCommunity = () => {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const { loading, makeRequest } = useAxios();
  const { communityId } = router.query;
  const { memberships, communities, hasFetchedMemberships, hasFetchedCommunities } = useAppSelector(store => store.communities)
  const isMemberOfCommunity = useMemo(() => 
    hasFetchedMemberships && memberships.find(it => it.community === communityId), 
  [memberships, communityId, hasFetchedMemberships])
  const community = useMemo(() => communities.find(it => it._id === communityId), [communities, communityId])
  const fetchCommunity = useCallback(async () => {
    if(!communityId) return
    const result = await makeRequest({
      url: urls.getCommunityById(communityId as string),
      method: 'get',
    });
    const data = (result.data as any)
    if (data.community as Community) {
      dispatch(updateCommunities([data.community]))
    }
  }, [communityId])

  useEffect(() => {
    if(!community && hasFetchedCommunities === false){
      fetchCommunity()
    }
  }, [fetchCommunity, community]);

  return (
    <Flex flexDirection="column" h={{ base: '80dvh', md: '100dvh' }} overflow="hidden" w="100%">
      <DesktopHeader />
      {
        loading ? <LoadingState/> :
          <Box w="95%" mr="3%" ml="2%">
          <Box h="20%" w="100%" pos="sticky" top="0" borderRadius="0.5rem">
            <CommunityChatHeading community={community} />
          </Box>
          <Box  h={{ base: 'calc(100vh - 36rem)', }} overflow="auto" pt="8rem">
            <CommunityConversation messages={community?.messages || []} />
          </Box>
          <CommunityChatInput community={community} />
        </Box>
      }
    </Flex>
  );
};

SingleCommunity.requireAuth = true;
SingleCommunity.getLayout = (page: any) => (
  <ProtectedLayout title="Community">{page}</ProtectedLayout>
);
export default SingleCommunity;
