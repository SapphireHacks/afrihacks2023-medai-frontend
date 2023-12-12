import {  Button, Text } from '@chakra-ui/react';
import { Children } from "@/types";

export default function ActionItem({ onClick, children }: {
  onClick?: () => void
  children: Children["children"]
}) {
  return (
    <Button 
      h="100%" 
      w="100%"
      onClick={onClick} 
      display="block" 
      p="1.6rem"
      border="1.5px solid"
      borderColor="white.700"
      borderRadius="2rem"
      bg="transparent"
      _active={{ bg: "secondary.50"}}
      _focus={{ bg: "secondary.100", _hover: { bg: "secondary.100" }}}
      _hover={{ bg: "secondary.50"}}
      >
      <Text
        fontSize={{ base: '1.4rem', md: '1.8rem' }}
        fontWeight="500"
        lineHeight="150%"
        color="white.800"
        textAlign="center"
        whiteSpace="wrap"
      >
       {children}
      </Text>
    </Button>
  );
}
