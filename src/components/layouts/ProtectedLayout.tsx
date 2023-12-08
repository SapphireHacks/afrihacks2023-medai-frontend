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
import MedAILogo from '@/assets/images/medAI';

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
      px={{
        base: '0',
        md: '4rem'
      }}
    >
      <GridItem colSpan={3}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py="1rem"
          pr={{
            base: '1rem',
            md: '3rem'
          }}
          pt="2rem"
        >
          <MedAILogo height={' 6rem'} width={'6rem'} />
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
