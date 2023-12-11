import { Children } from '@/types/index';
import {
  Grid,
  GridItem,
  List,
  VStack,
  ListItem,
  Button,
  Icon,
  useBoolean,
  Flex
} from '@chakra-ui/react';
import navLinks from './navLinks';
import { NavLinkIconItem } from '../components/NavLinkItem';
import Image from 'next/image';
import EditIcon from '@/assets/icons/edit';
import DoubleChevronIcon from '@/assets/icons/doubleChevron';
import NavigationDrawer from '../components/NavigationDrawer';
import { useRef } from 'react';
import LogoutIcon from '@/assets/icons/logOut';
import CreateNewChatButton from '@/components/buttons/CreateNewChatButton';
import LogoutButton from '@/components/buttons/LogoutButton';

const CollapsedNavLayout = ({ children }: Children) => {
  const [isOpen, setIsOpen] = useBoolean();
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <NavigationDrawer
        isOpen={isOpen}
        finalFocusRef={finalFocusRef}
        setIsOpen={setIsOpen}
      />

      <Grid
        templateColumns={'repeat(12, minmax(8.8rem, 1fr))'}
        gap={'1rem'}
        mx="auto"
      >
        <GridItem as="nav" colSpan={1} bg="primary.50">
          <List as={VStack} mb="64px" spacing="2rem" pt="2.4rem">
            <ListItem>
              <Button bg="transparent" onClick={setIsOpen.on}>
                <DoubleChevronIcon />
              </Button>
            </ListItem>
            <ListItem>
              <Image
                src="/app-logo.png"
                alt="medai logo"
                width={50}
                height={50}
                style={{ width: '7rem', height: 'auto', objectFit: 'cover' }}
              />
            </ListItem>
            <ListItem>
              <CreateNewChatButton>
                <Icon as={EditIcon} w="3rem" h="3rem" />
              </CreateNewChatButton>
            </ListItem>
            {navLinks.map(link => (
              <ListItem key={link.path} w="60%" mx="auto">
                <NavLinkIconItem {...link} />
              </ListItem>
            ))}
          </List>
          <Flex justify="center">
            <LogoutButton>
              <Icon color="" as={LogoutIcon} w="3rem" h="3rem" />
            </LogoutButton>
          </Flex>
        </GridItem>
        <GridItem colSpan={11}>{children}</GridItem>
      </Grid>
    </>
  );
};
export default CollapsedNavLayout;
