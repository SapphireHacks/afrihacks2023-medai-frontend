import { Box } from "@chakra-ui/react";
import ChatInput from "../chat/ChatInput";
import { StoreCommunity } from "@/redux/communities/slice";

export default function CommunityChatInput({
  community
}: {
  community?: StoreCommunity
}){
  return (
    <Box py="1.6rem" position="absolute" bottom="0" width="calc(100% - 4rem)">
      <ChatInput onSubmit={(message) => console.log(message)} />
    </Box>
  )
}