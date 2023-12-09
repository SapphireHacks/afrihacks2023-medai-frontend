import { Flex, Stack, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import NavLinkItem from './protected/NavLinkItem';
import LinkItems from './protected/navLinks';
import LogoutIcon from '@/assets/icons/logOut';

const Sidebar = () => {
  return (
    <Flex
      pr={{
        base: '1rem',
        md: '3rem'
      }}
      position={{
        base: 'fixed',
        md: 'static'
      }}
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      top="5rem"
      left="0"
      right="0"
      bottom="0"
      w={{ base: '100%' }}
      zIndex="1"
      pt="2rem"
    >
      <Stack gap="2rem" mb="6rem" w="100%">
        {LinkItems.map(item => (
          <NavLinkItem
            key={item.label}
            path={item.path}
            label={item.label}
            icon={item.icon}
            activeIcon={item.activeIcon}
          />
        ))}
      </Stack>
      <Flex gap="1rem" alignItems="center" className="signout">
        <Icon as={LogoutIcon} w="2rem" h="2rem" />
        <Text fontSize="lg" color="#DC3545">
          Sign Out
        </Text>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
