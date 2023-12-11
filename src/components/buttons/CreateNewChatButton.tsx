
import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
import { Children } from "@/types/index"
import { createNewConversation, updateLoading } from '@/redux/conversations/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter, usePathname } from 'next/navigation';

const CreateNewChatButton = ({ children, onCreateNewChat }: Children & {
  onCreateNewChat?: () => void
}) => {
  const { activeConversationId } = useAppSelector(store => store.conversations)
  const router = useRouter();
  const pathname = usePathname()
  const dispatch = useAppDispatch();

  const createNewChat = useCallback(() => {
    if(pathname === "/" && activeConversationId !== null) return 
    dispatch(createNewConversation());
    dispatch(updateLoading(true))
    if (onCreateNewChat) onCreateNewChat();
    pathname !== "/" && router.push('/');
  }, [onCreateNewChat, dispatch, router, pathname, activeConversationId]);

  return (
    <Flex as="button" onClick={createNewChat}>
      {children}
    </Flex>
  )
}

export default CreateNewChatButton