import { Children } from '@/types/index';
import { Flex, Box, Icon, Text, Button, useBoolean } from '@chakra-ui/react';
import NavigationDrawer from './NavigationDrawer';
import HamburgerIcon from '@/assets/icons/hamburger';
import { Divider } from '@chakra-ui/react';
import { useRef } from 'react';

const MobileLayout = ({
  children,
  HeaderActionItems,
  title
}: Children & {
  title: string;
  HeaderActionItems?: () => JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useBoolean();
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <NavigationDrawer
        isOpen={isOpen}
        finalFocusRef={finalFocusRef}
        setIsOpen={setIsOpen}
      />
      <Box
        as="header"
        position="fixed"
        zIndex="100"
        w="100%"
        bg="white"
        top="0"
      >
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
          <Text
            as="h1"
            fontSize="lg"
            fontWeight="600"
            textTransform="capitalize"
          >
            {title}
          </Text>
          <Box>{HeaderActionItems && <HeaderActionItems />}</Box>
        </Flex>
        <Divider position="relative" zIndex="-3" />
      </Box>
      <Box
        pt={{ base: '100px', md: '0' }}
        overflowY="auto"
        h="100vh"
        sx={{
          '::-webkit-scrollbar': {
            width: '10px'
          },
          '::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '6px'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: 'darkgray'
          }
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default MobileLayout;
