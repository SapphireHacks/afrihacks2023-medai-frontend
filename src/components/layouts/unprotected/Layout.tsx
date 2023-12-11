import { Box } from '@chakra-ui/react';
import { Children } from '@/types/index';

const Layout = ({ children }: Children) => {
  return (
    <Box
      padding={{ base: 'unset', sm: '1rem', md: '3rem' }}
      height={'100vh'}
      bg={'white'}
    >
      {children}
    </Box>
  );
};

export default Layout;
