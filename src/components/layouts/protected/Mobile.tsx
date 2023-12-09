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
import CreateNewChatButton from "@/components/buttons/CreateNewChatButton"

const MobileLayout = ({ children }: Children) => {
  const [isOpen, setIsOpen] = useBoolean();
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <NavigationDrawer isOpen={isOpen} finalFocusRef={finalFocusRef} setIsOpen={setIsOpen}/>
      <Box
        as="header"
        position="fixed"
        zIndex="100"
        w="100%"
        bg="white"
        top="0">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pb="1rem"
          pt="2rem"
          px="2rem"
        >
          <Button
            onClick={setIsOpen.toggle}
            backgroundColor="transparent"
            title="toggle navigation"
            p="0"
          >
            <Icon width="12" height="12" as={HamburgerIcon} />
          </Button>
          <Text as="h1" fontSize="lg" fontWeight="600" textTransform="capitalize">
            Doc MedAI
          </Text>
          <CreateNewChatButton>
            <Icon as={EditIcon} w="2rem" h="2rem" />
          </CreateNewChatButton>
        </Flex>
        <Divider />
      </Box>
      <Box>{children}</Box>
    </>
  );
};

export default MobileLayout;
