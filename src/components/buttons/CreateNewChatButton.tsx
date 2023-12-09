
import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
import { Children } from "@/types/index"

const CreateNewChatButton = ({ children, onCreateNewChat }: Children & {
  onCreateNewChat?: () => void
}) => {

  const createNewChat = useCallback(() => {
    // create new chat code
    console.log("create new chat")
    if(onCreateNewChat) onCreateNewChat()
  }, [onCreateNewChat])

  return (
    <Flex as="button" onClick={createNewChat}>
      {children}
    </Flex>
  )
}

export default CreateNewChatButton