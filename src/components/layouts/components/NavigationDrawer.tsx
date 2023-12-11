import Navigation from './Navigation';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';

const NavigationDrawer = ({
  isOpen,
  finalFocusRef,
  setIsOpen
}: {
  isOpen: boolean;
  finalFocusRef: MutableRefObject<any>;
  setIsOpen: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={setIsOpen.off}
      finalFocusRef={finalFocusRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent background="primary.50">
        <DrawerBody>
          <Navigation closeNav={setIsOpen.off} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationDrawer;
