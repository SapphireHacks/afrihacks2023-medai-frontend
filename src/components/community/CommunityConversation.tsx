import useSortMessages from "@/hooks/useSortMessages";
import { CommunityMessage } from "@/types/chat";
import { Flex } from "@chakra-ui/react";
import { UserBubble } from "../chat/ChatBubbles";
import { User } from "@/redux/user/slice";



export default function CommunityConversation({
  messages,
  user
}: {
  user?: User["data"]
  messages: (CommunityMessage)[]
}) {
  const sortedMessages = useSortMessages((messages || []).map(it => {
    if (it.sender?._id === user?._id) return ({ ...it, direction: "row-reverse" })
    else return ({ ...it, direction: "row" })
  }));
  return (
    <Flex flexDirection="column" gap="16px" w="100%" position="relative">
      {sortedMessages.map((msg: any) => {
        return <UserBubble key={msg._id} user={msg.sender} direction={msg.direction} content={msg.message} />;
      })}
    </Flex>
  )
}
