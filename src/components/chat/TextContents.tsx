import { Text, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const TextContent = ({
  content,
  bg,
  textAlign,
  borderRadius
}: {
  textAlign: 'left' | 'right';
  bg: string;
  content: ReactNode;
  borderRadius: string;
}) => {
  const Wrapper = typeof content === 'string' ? Text : Box;

  return (
    <Text
      dangerouslySetInnerHTML={{ __html: content.replace(/(?:\\n|\r|\n)/g, '<br>') }}
    <Wrapper
      w="fit-content"
      maxW="72ch"
      textAlign={textAlign}
      bg={bg}
      p="1.2rem"
      fontSize={{ base: '1.1rem', md: '1.6rem' }}
      borderRadius={borderRadius}
    >
    </Text>
    </Wrapper>
  );
};
export default TextContent;

export const UserTextContent = ({ content }: { content: ReactNode }) => {
  return (
    <TextContent
      borderRadius={'10px 0 10px 10px'}
      bg="primary.50"
      textAlign="right"
      content={content}
    />
  );
};

export const MedAITextContent = ({ content }: { content: ReactNode }) => {
  return (
    <TextContent
      borderRadius={'10px 10px 10px 0'}
      bg="white.main"
      textAlign="left"
      content={content}
    />
  );
};
