import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import {
  Box,
  Flex
} from '@chakra-ui/react';
import { useEffect } from 'react';
import useAxios from '@/hooks/use-axios';
import urls from '@/services/urls';
import LoadingState from '@/components/loading-state';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AcceptTermsAndConditionsForm from "@/components/community/AcceptTermsAndConditionsFom";
import DesktopHeader from "@/components/community/DesktopHeader";
import CommunitiesList from "@/components/community/CommunitiesList";
import CommunitiesSearchBar from "@/components/community/CommunitiesSearchBar";
import { updateCommunities, updateMemberships } from "@/redux/communities/slice";

const Community = () => {
  const dispatch = useAppDispatch()
  const { data: userData } = useAppSelector(store => store.user)
  const { communities, hasFetchedCommunities, searchResults, searchTerm } = useAppSelector(store => store.communities)
  const { loading, makeRequest } = useAxios();

  useEffect(() => {
    const fetchCommunities = async () => {
      const membershipsResponse = await makeRequest({
        url: urls.getMemberships,
        method: "get"
      })
      const communitiesResponse = await makeRequest({
        url: urls.getCommunities,
        method: 'get',
      });
      const communitiesResult = communitiesResponse.data as any
      if(Array.isArray(communitiesResult?.communities)){
        dispatch(updateCommunities(communitiesResult.communities))
      }
      const membershipsResult = membershipsResponse.data as any
      Array.isArray(membershipsResult?.communities) && 
      dispatch(updateMemberships(membershipsResult.communities))
    }
    !hasFetchedCommunities && fetchCommunities()
  }, [dispatch, hasFetchedCommunities, makeRequest]);

  if(!userData) return <LoadingState/>
  if (!userData?.hasAcceptedCommunityTerms) return (
    <AcceptTermsAndConditionsForm />
  )
  return (
    <>
      <Flex flexDirection="column" h={{ base: '80dvh', md: '100dvh' }} overflow="hidden" w="100%">
        <DesktopHeader />
        {
          loading ? <LoadingState/> :
          <>
            <Box w="92%" position="sticky" mx="auto" top="0" mt={{ base: "1rem", md: "3.5rem" }}>
              <CommunitiesSearchBar />
            </Box>
            <Box w="92%" mx="auto" mt={{ base: "calc(2rem + 42px)", md: "calc(3.4rem + 42px)" }}>
                {
                  ((searchTerm.length > 0 && searchResults.length > 0) || searchTerm.length === 0) &&
                  <CommunitiesList communities={searchTerm.length === 0 ? communities : searchResults} />
                }
            </Box>
          </>
        }
      </Flex>
    </>
  );
};

Community.requireAuth = true;
Community.getLayout = (page: any) => (
  <ProtectedLayout title="Community">{page}</ProtectedLayout>
);
export default Community;
