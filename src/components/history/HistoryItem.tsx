import { Box, Text, Icon, Button, Show, Flex } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import TrashIcon from '@/assets/icons/trash';
import LeftChevron from '@/assets/icons/leftChevron';
import Options from '@/assets/icons/options';
import type { Conversation } from '@/types/chat';
import {
  updateActiveConversationId,
  updateIdOfChatToDelete
} from '@/redux/conversations/slice';
import { ConfirmDeletePopover } from "./ClearHistoryButton"
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

export default function HistoryItem({
  conversation
}: {
  conversation: Conversation;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createdAt = new Date(conversation.createdAt);
  const date = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(createdAt);
  const time = createdAt.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Flex
      alignItems="center"
      borderRadius="8px"
      bg="white.400"
      w="100%"
      px={{ base: '1.4rem', md: '1.6rem' }}
      py="1.6rem"
      cursor="pointer"
    >
      <Box
        flexGrow="1"
        overflow="hidden"
        onClick={() => {
          dispatch(updateActiveConversationId(conversation._id));
          router.push('/');
        }}
      >
        <Text
          fontWeight={{ base: '600', md: '500' }}
          fontSize={{ base: '1.4rem', md: '1.8rem' }}
          w="95%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          color="black"
          mb="8px"
        >
          {conversation.title}
        </Text>
        <Text color="white.700" fontSize={{ base: '1.2rem', md: '1.4rem' }}>
          {date} - {time}
        </Text>
      </Box>
      <Popover placement="left-start">
        <PopoverTrigger>
          <Button bg="transparent" p="0">
            <Show below="md">
              <Icon w="2rem" h="2rem" as={LeftChevron} />
            </Show>
            <Show above="md">
              <Icon w="2rem" h="2rem" as={Options} />
            </Show>
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="white.main">
          <PopoverBody>
            <ConfirmDeletePopover
              confirmDelete={() =>
                dispatch(updateIdOfChatToDelete(conversation._id))
              }
            >
              <Button
                _hover={{ bg: 'white.500' }}
                fontSize="1.6rem"
                py="2rem"
                w="100%"
                justifyContent="center"
                display="flex"
                gap="1rem"
                bg="transparent"
              >
                <Icon as={TrashIcon} /> Delete
              </Button>
            </ConfirmDeletePopover>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}


