import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkItemProps {
  path: string;
  label: string;
  icon?: React.FC;
  activeIcon?: React.FC;
}

function useGetIsActive(path: string) {
  const router = useRouter();
  return router.pathname === path;
}

const NavLinkItem = ({ path, label, icon, activeIcon }: NavLinkItemProps) => {
  const isActive = useGetIsActive(path)

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
        <Icon as={isActive ? activeIcon : icon} w="3rem" h="3rem" />
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

export default NavLinkItem;


export function NavLinkIconItem({ path, label, icon, activeIcon }: NavLinkItemProps){
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
  )
}