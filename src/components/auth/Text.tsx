import { Children } from "@/types";
import {
  Text
} from '@chakra-ui/react';

export const FormHeading = ({ children }: Children) => {
  return (
    <Text fontSize={{ base: "2.4rem", md: "3.6rem" }} fontWeight="600">
      {children}
    </Text>
  )
}

export const Paragraph = ({ children }: Children) => {
  return (
    <Text
      fontSize={{
        base: '1.4rem',
        md: '2rem'
      }}
      fontWeight="400"
      color="text.300"
    >
      {children}
    </Text>
  )
}