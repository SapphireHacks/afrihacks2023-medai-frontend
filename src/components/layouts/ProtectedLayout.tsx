import { Children } from '@/types/index';
import {
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import HamburgerIcon from '@/assets/icons/hamburger';
import CloseIcon from '@/assets/icons/close';
import EditIcon from '@/assets/icons/edit';
import Image from 'next/image';
import MedAILogo from '@/assets/images/medAI-transparent.png';

const ProtectedLayout = ({ children }: Children) => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(12, 1fr)'
      }}
      gap={{
        base: '0',
        md: '16px'
      }}
      pr={{
        base: '0',
        md: '4rem'
      }}
    >
      <GridItem colSpan={3} bg="primary.50" pl="4rem">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py="1rem"
          mr={{
            base: '1rem',
            md: '3rem'
          }}
          pt="2rem"
        >
          <Image
            src={MedAILogo}
            alt="MedAI Logo"
            style={{
              width: '6rem',
              height: '6rem'
            }}
          />
          <Text fontSize="lg" fontWeight="550">
            New Chat
          </Text>
          <Icon as={EditIcon} w="2rem" h="2rem" />
        </Flex>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={9}>{children}</GridItem>
    </Grid>
  );
};

export default ProtectedLayout;
