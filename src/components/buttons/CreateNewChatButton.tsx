
import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
import { Children } from "@/types/index"
import { createNewConversation } from '@/redux/conversations/slice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const CreateNewChatButton = ({ children, onCreateNewChat }: Children & {
  onCreateNewChat?: () => void
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createNewChat = useCallback(() => {
    dispatch(createNewConversation());
    if (onCreateNewChat) onCreateNewChat();
    router.push('/');
  }, [onCreateNewChat, dispatch, router]);

  return (
    <Flex as="button" onClick={createNewChat}>
      {children}
    </Flex>
  )
}

export default CreateNewChatButton