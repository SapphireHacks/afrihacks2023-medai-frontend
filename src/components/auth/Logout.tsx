import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { resetShouldLogout } from "@/redux/user/slice"
import { Show, Drawer, DrawerOverlay, DrawerContent, Button, Modal, ModalContent, Text, ModalOverlay, Container, Heading, Icon, Flex, Box } from "@chakra-ui/react"
import logoutIcon from "@/assets/icons/logOut"
import { useLogUserOut } from "@/hooks/useLogUserOut"


const ConfirmLogoutDisplay = () => {

  const logUserOut = useLogUserOut()
  const dispatch = useAppDispatch()
  return (
    <Container background="white.main" maxW={"840px"}       borderRadius="12px">
      <Box w="">
        <Heading 
          as={Flex} 
          color="#EE0F0F" 
          align="center"
          pt={{ base: "4.2rem", md: "6.4rem" }}
          mx="auto" borderBottom="1px solid" 
          borderBottomColor="#eee"
          pb={{ base: "2.4rem", md: "3.1rem" }} 
          fontWeight="600"
          fontSize={{ base: "2rem", md: "2.4rem", }}>
          <Icon as={logoutIcon} justifySelf="start" />
          <Text flexGrow="1" textAlign="center">Sign Out</Text>
        </Heading>
        <Text 
          fontWeight="500" 
          py={{ base: "2.4rem" }} 
          pb={{ base: "2.8rem", md: "4rem" }} 
          textAlign="center" 
          fontSize={{ base: "1.4rem", md: "1.6rem", }} 
          borderBottom="1px solid" 
          borderBottomColor="#eee">
            Are you sure you want to sign out of MedAI?
        </Text>
        <Flex 
          justify="space-around" 
          pb="4.2rem" pt="5.6rem" 
          maxW={{ base: "80%", md: "initial" }} 
          mx="auto">
          <Button 
            onClick={() => dispatch(resetShouldLogout())}
            h="unset" 
            p="1rem"
            borderRadius="2rem" 
            flexGrow="1" 
            maxW="47%" 
            fontSize={{ base: "1.4rem", md: "1.8rem" }} 
            fontWeight="500" 
            textAlign="center">
              Cancel
          </Button>
            <Button 
              onClick={logUserOut}
            _hover={{ bg: "#EE0F0F", filter: "brightness(0.9)"}}
              h="unset"
              w="100%"
              display="block"
              p="1rem"
              borderRadius="2rem"
              flexGrow="1" maxW="47%" bg="#EE0F0F"
              color="white.main"
              fontSize={{ base: "1.4rem", md: "1.8rem" }}
              fontWeight="500" textAlign="center">
              Yes, Sign me out
            </Button>
        </Flex>
      </Box>
    </Container>
  )
}

export const MobileLogoutDrawer = () => {
  const dispatch = useAppDispatch()
  const { shouldLogout } = useAppSelector(store => store.user)
  return (
    <Show below="md">
      <Drawer placement={"bottom"} onClose={() => { dispatch(resetShouldLogout()) }} isOpen={shouldLogout}>
        <DrawerOverlay />
        <DrawerContent>
          <ConfirmLogoutDisplay />
        </DrawerContent>
      </Drawer>
    </Show>
  )
}

export const DesktopLogoutModal = () => {
  const dispatch = useAppDispatch()
  const { shouldLogout } = useAppSelector(store => store.user)
  return (
    <Show above="md">
      <Modal size="xl" onClose={() => dispatch(resetShouldLogout())} isOpen={shouldLogout} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ConfirmLogoutDisplay />
        </ModalContent>
      </Modal>
    </Show>
  )
}

