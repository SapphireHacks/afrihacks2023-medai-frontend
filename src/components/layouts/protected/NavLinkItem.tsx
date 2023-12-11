import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkItemProps {
  path: string;
  label: string;
  icon?: React.FC;
  activeIcon?: React.FC;
  closeNav?: () => void;
}

function useGetIsActive(path: string) {
  const router = useRouter();
  const currentPath = router.pathname;
  if (path !== '/' && currentPath === path) {
    return true;
  }
  return currentPath.startsWith(path + '/') || currentPath === path;
}

const NavLinkItem = ({
  path,
  label,
  icon,
  activeIcon,
  closeNav
}: NavLinkItemProps) => {
  const isActive = useGetIsActive(path);

  return (
    <Link
      as={NextLink}
      href={path}
      _hover={{
        textDecoration: 'none'
      }}
      _active={{ textDecoration: 'none' }}
      onClick={closeNav}
    >
      <Flex
        align="center"
        gap="1rem"
        p="0.8rem"
        w="100%"
        bg={isActive ? 'primary.800' : 'unset'}
        borderRadius="0.5rem"
        color={isActive ? 'white' : 'black'}
        transition="background 400ms ease"
        _active={{bg: "primary.400", color: "white",}}
        _hover={{
          bg: isActive ? 'primary.900' : 'primary.100'
        }}
        >
        <Icon
          stroke={isActive ? '#fff' : undefined}
          as={icon}
          w="3rem"
          h="3rem"
        />
        <Text fontSize="lg" fontWeight="500" textDecoration="none">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export default NavLinkItem;

export function NavLinkIconItem({
  path,
  label,
  icon,
  activeIcon
}: NavLinkItemProps) {
  const isActive = useGetIsActive(path);

  return (
    <Link as={NextLink} href={path} title={label}>
      <Flex
        alignItems="center"
        justifyContent="center"
        p="1rem"
        w="100%"
        bg={isActive ? 'primary.800' : 'unset'}
        borderRadius="0.5rem"
      >
        <Icon as={isActive ? activeIcon : icon} w="3rem" h="3rem" />
      </Flex>
    </Link>
  );
}
