import {
  Box,
  Text,
} from '@chakra-ui/react';

const Header = ({ title }: {
  title: string
}) => {

  return (
    <Box pt="5.9rem" pb="2.4rem">
      <Text fontSize="2.4rem" fontWeight="600px">
        {title}
      </Text>
    </Box>
  );
};

export default Header