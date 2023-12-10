import { Flex, HStack, Box, keyframes } from '@chakra-ui/react';
import { MedAIChatAvatar, UserChatAvatar } from './Avatars';
import { MedAITextContent, UserTextContent } from './TextContents';
import { Children } from '@/types/index';

const Bubble = ({
  children,
  justification,
  direction,
  gap
}: Children & {
  justification: 'start' | 'end';
  direction?: 'row' | 'row-reverse';
  gap: { [x: string]: string };
}) => {
  return (
    <Flex
      flexDirection={direction || 'row'}
      justify={justification}
      w="100%"
      gap={gap}
    >
      {children}
    </Flex>
  );
};

export const UserBubble = ({
  content,
  user
}: {
  content: string;
  user: {
    profileImage: string;
    firstName: string;
    lastName: string;
  } | null;
}) => {
  return (
    <Bubble
      gap={{ base: '10px', md: '24px' }}
      direction="row-reverse"
      justification="end"
    >
      <UserChatAvatar
        imageSrc={user?.profileImage}
        name={`${user?.firstName} ${user?.lastName}`}
      />
      <UserTextContent content={content} />
    </Bubble>
  );
};

export const AIBubble = ({ content }: { content: string }) => {
  return (
    <Bubble
      gap={{ base: '10px', md: '16px' }}
      direction="row"
      justification="start"
    >
      <MedAIChatAvatar />
      <MedAITextContent content={content} />
    </Bubble>
  );
};

export const AIBubbleLoading = () => {
  const bounce = keyframes`  
    from {transform: translateY(-10px)}   
    to {transform: translateY(10px)}
  `;

  return (
    <Bubble
      gap={{ base: '10px', md: '16px' }}
      direction="row"
      justification="start"
    >
      <MedAIChatAvatar />
      <HStack spacing="2rem" position="relative">
        <Box
          animation={`${bounce} infinite 1500ms ease-in-out`}
          position="absolute"
          left="30px"
          w={{ base: '0.9rem', md: '1.5rem' }}
          h={{ base: '0.9rem', md: '1.5rem' }}
          bg="primary.600"
          borderRadius="50%"
        ></Box>
        <Box
          animation={`${bounce} infinite 1500ms 500ms ease-in-out`}
          position="absolute"
          left="60px"
          w={{ base: '0.9rem', md: '1.5rem' }}
          h={{ base: '0.9rem', md: '1.5rem' }}
          bg="primary.600"
          borderRadius="50%"
        ></Box>
        <Box
          animation={`${bounce} infinite 1500ms 1000ms ease-in-out`}
          position="absolute"
          left="90px"
          w={{ base: '0.9rem', md: '1.5rem' }}
          h={{ base: '0.9rem', md: '1.5rem' }}
          bg="primary.600"
          borderRadius="50%"
        ></Box>
      </HStack>
    </Bubble>
  );
};
