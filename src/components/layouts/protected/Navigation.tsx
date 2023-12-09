import { Flex, Stack, Text, ListItem, List, Icon } from '@chakra-ui/react';
import React from 'react';
import NavLinkItem from './NavLinkItem';
import navLinks from './navLinks';
import LogoutIcon from '@/assets/icons/logOut';
import EditIcon from '@/assets/icons/edit';
import Image from 'next/image';
import CreateNewChatButton from "@/components/buttons/CreateNewChatButton"
import LogoutButton from "@/components/buttons/LogoutButton"

const Sidebar = () => {
  return (
    <Flex as="nav" flexDirection="column" bg="transparent" w="100%">
      <Flex
        flexDirection="column"
        py="24px"
        justifyContent="start"
        alignItems="start"
        rowGap="32px"
        w="78.9%"
        mx="auto"
      >
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Flex gap="4px" alignItems="center">
            <Image
              src="/app-logo.png"
              objectFit="cover"
              alt="medai logo"
              width={50}
              height={50}
              style={{ width: '7rem', height: 'auto' }}
            />
            <Text fontSize="lg" fontWeight="550">
              New Chat
            </Text>
          </Flex>
          <CreateNewChatButton>
            <Icon as={EditIcon} w="2rem" h="2rem" />
          </CreateNewChatButton>
        </Flex>
        <List as={Stack} gap="2rem" mb="6rem" w="100%">
          {navLinks.map(item => (
            <ListItem key={item.label} as="li" w="100%">
              <NavLinkItem
                path={item.path}
                label={item.label}
                icon={item.icon}
                activeIcon={item.activeIcon}
              />
            </ListItem>
          ))}
        </List>
        <LogoutButton>
          <Flex
          gap="1rem"
          p="0.8rem"
          alignItems="center"
          className="signout"
        >
          <Icon as={LogoutIcon} w="2rem" h="2rem" />
          <Text fontSize="lg" color="#DC3545">
            Sign Out
          </Text>
        </Flex>
        </LogoutButton>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
