import { Children } from '@/types/index';
import { Show } from '@chakra-ui/react';
import DesktopLayout from './Desktop';
import MobileLayout from './Mobile';

const ProtectedLayout = ({ children }: Children) => {
  return (
    <>
      <Show above="md">
        <DesktopLayout>{children}</DesktopLayout>
      </Show>
      <Show below="md">
        <MobileLayout>{children}</MobileLayout>
      </Show>
    </>
  );
};

export default ProtectedLayout;
