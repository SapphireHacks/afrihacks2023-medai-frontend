import { Children } from '@/types/index';
import {
  Flex,
  Box,
  Icon,
  Text,
  Button,
  useBoolean
} from '@chakra-ui/react';
import NavigationDrawer from './NavigationDrawer';
import HamburgerIcon from '@/assets/icons/hamburger';
import EditIcon from '@/assets/icons/edit';
import { Divider } from '@chakra-ui/react';
import { useRef } from 'react';

const MobileLayout = ({ children }: Children) => {
  const [isOpen, setIsOpen] = useBoolean();
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <NavigationDrawer isOpen={isOpen} finalFocusRef={finalFocusRef} setIsOpen={setIsOpen}/>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        pb="1rem"
        pt="2rem"
        px="2rem"
        as="header"
        position="fixed"
        w="100%"
        bg="white"
        top="0"
      >
        <Button
          onClick={setIsOpen.toggle}
          backgroundColor="transparent"
          title="toggle navigation"
          p="0"
        >
          <Icon width="12" height="12" as={HamburgerIcon} />
        </Button>
        <Text fontSize="lg" fontWeight="600" textTransform="capitalize">
          Doc MedAI
        </Text>
        <Icon as={EditIcon} w="2rem" h="2rem" />
      </Flex>
      <Divider />
      <Box>{children}</Box>
    </>
  );
};

export default MobileLayout;
