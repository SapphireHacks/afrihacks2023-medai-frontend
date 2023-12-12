import { Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Children } from '@/types/index';
import {
  createNewConversation,
  updateLoading
} from '@/redux/conversations/slice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter, usePathname } from 'next/navigation';
import { setShowHospitalSearch } from '@/redux/hospital-search/slice';

const CreateNewChatButton = ({
  children,
  onCreateNewChat
}: Children & {
  onCreateNewChat?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const createNewChat = useCallback(() => {
    dispatch(createNewConversation());
    dispatch(updateLoading(true));
    dispatch(setShowHospitalSearch(false));
    if (onCreateNewChat) onCreateNewChat();
    pathname !== '/' && router.push('/');
  }, [onCreateNewChat, dispatch, router, pathname]);

  return (
    <Flex as="button" onClick={createNewChat}>
      {children}
    </Flex>
  );
};

export default CreateNewChatButton;
