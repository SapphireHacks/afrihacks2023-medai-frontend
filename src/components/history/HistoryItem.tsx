import { Box, Text, Icon, Button, Show, Flex } from '@chakra-ui/react';
import LeftChevron from '@/assets/icons/leftChevron';
import Options from '@/assets/icons/options';

export default function HistoryItem() {
  return (
    <Flex 
      alignItems="center" 
      borderRadius="8px" 
      bg="white.500" 
      w="100%" 
      px={{"base": "1.4rem", md: "1.6rem"}} 
      py="1.6rem">
      <Box flexGrow="1" overflow="hidden">
        <Text
          fontWeight={{ "base": "600", md: "500" }}
          fontSize={{"base": "1.4rem", md: "1.8rem"}}
          w="95%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          color="black"
          mb="8px"
        >
          Hello MedAI, I need your help. I don&quot;t Hello MedAI, I need your help. I don&quot;t
        </Text>
        <Text color="white.400" fontSize={{"base": "1.2rem", md: "1.4rem"}}>21 Nov 2023 - 09:56 </Text>
      </Box>
      <Button bg="transparent" p="0">
        <Show below="md">
          <Icon w="2rem" h="2rem" as={LeftChevron} />
        </Show>
        <Show above="md">
          <Icon w="2rem" h="2rem" as={Options} />
        </Show>
      </Button>
    </Flex>
  );
}
