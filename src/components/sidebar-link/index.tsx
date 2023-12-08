import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  path: string;
  label: string;
  icon?: React.FC;
  activeIcon?: React.FC;
}

const SidebarLink = ({ path, label, icon, activeIcon }: SidebarProps) => {
  const router = useRouter();
  const isActive = router.pathname === path;

  return (
    <Link as={NextLink} href={path}>
      <Flex
        align="center"
        gap="1rem"
        p="0.8rem"
        w="100%"
        bg={isActive ? 'primary.800' : 'unset'}
        borderRadius="0.5rem"
      >
        <Icon as={isActive ? activeIcon : icon} w="2rem" h="2rem" />
        <Text
          color={isActive ? 'white' : 'black'}
          fontSize="lg"
          fontWeight="500"
        >
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export default SidebarLink;
