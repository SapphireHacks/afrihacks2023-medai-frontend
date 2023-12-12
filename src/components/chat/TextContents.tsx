import { Text } from '@chakra-ui/react';

const TextContent = ({
  content,
  bg,
  textAlign,
  borderRadius
}: {
  textAlign: 'left' | 'right';
  bg: string;
  content: string;
  borderRadius: string
}) => {
  return (
    <Text
      dangerouslySetInnerHTML={{ __html: content.replace(/(?:\\n|\r|\n)/g, '<br>') }}
      w="fit-content"
      maxW="72ch"
      textAlign={textAlign}
      bg={bg}
      p="1.2rem"
      fontSize={{ base: '1.1rem', md: '1.6rem' }}
      borderRadius={borderRadius}
    >
    </Text>
  );
};
export default TextContent;

export const UserTextContent = ({ content }: { content: string }) => {
return <TextContent borderRadius={"10px 0 10px 10px"} bg="primary.50" textAlign="right" content={content} />;
};

export const MedAITextContent = ({ content }: { content: string }) => {
  return <TextContent borderRadius={"10px 10px 10px 0"} bg="white.main" textAlign="left" content={content} />;
};
