import { Children } from '@/types/index';
import {
  Flex,
  Box,
  Icon,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button
} from '@chakra-ui/react';
import Navigation from './Navigation';
import HamburgerIcon from '@/assets/icons/hamburger';
import EditIcon from '@/assets/icons/edit';
import { Divider } from '@chakra-ui/react';
import { useState, useCallback, useRef } from 'react';

const MobileLayout = ({ children }: Children) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={finalFocusRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent background="white">
          <DrawerBody>
            <Navigation />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
        <Button
          onClick={() => setIsOpen(true)}
          backgroundColor="transparent"
          title="toggle navigation"
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
