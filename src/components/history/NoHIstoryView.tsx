import { Box, VStack, Text, Icon } from '@chakra-ui/react';
import NoHistoryIcon from '@/assets/icons/noHistory';

export default function c() {
  return (
    <Box
      as={VStack}
      spacing="2.4rem"
      w="87%"
      mx="auto"
      textAlign="center"
      color="white.300"
    >
      <Icon as={NoHistoryIcon} />
      <Text
        as="h2"
        fontSize={{ base: '2.4rem', md: '3.6rem' }}
        fontWeight="600"
      >
        Empty
      </Text>
      <Text as="p" fontSize={{ base: '1.6rem', md: '2.4rem' }} fontWeight="400">
        You have no history
      </Text>
    </Box>
  );
}
