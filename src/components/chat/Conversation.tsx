
import { Message } from "@/types/chat"
import { UserBubble, AIBubble, AIBubbleLoading } from "./ChatBubbles"
import { Flex } from "@chakra-ui/react"

export default function Conversation({ messages }: {
  messages: Message[]
}){
  const tempUser = {
    firstName: "Haley",
    lastName: "Thomas",
    profileImage: ""
  }
  return (
    <Flex flexDirection="column" gap="16px" w="100%">
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubble content={"placeholder"}/>
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubble content={"placeholder"}/>
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubble content={"placeholder"}/>
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubble content={"placeholder"}/>
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubble content={"placeholder"}/>
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubble content={"placeholder"}/>
      <UserBubble user={tempUser} content={"placeholder"} />
      <AIBubbleLoading />
    </Flex>
  )
}