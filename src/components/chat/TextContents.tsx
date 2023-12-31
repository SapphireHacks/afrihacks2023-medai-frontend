import { Text, Box } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';

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
  const Wrapper = typeof content === 'string' ? Fragment : Box;

  return (
    <Wrapper>
    <Text
      {...(typeof content === "string" ? { dangerouslySetInnerHTML:{ __html: content?.toString().replace(/(?:\\n|\r|\n)/g, '<br>') as string}} : {}) }
      w="fit-content"
      maxW="72ch"
      textAlign={textAlign}
      bg={bg}
      p="1.2rem"
      fontSize={{ base: '1.1rem', md: '1.6rem' }}
      borderRadius={borderRadius}>
        {typeof content !== "string" ? content : null}
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
