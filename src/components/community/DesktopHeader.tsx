import { Flex, Text } from "@chakra-ui/react";



export default function DesktopHeader(){
  return (
    <Flex justify="center" align="center" w="100%" py="3rem" display={{ base: "none", md: "flex"}}>
      <Text as="h2" fontSize="2xl" fontWeight="550">
        Community
      </Text>
    </Flex>
  )
}