import {
  Box,
  Flex,
} from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import { Children } from "@/types";
import useCheckLoggedInStatus from "@/hooks/useCheckLoggedInStatus";

const Layout = ({ children, imageAlt, imageSource }: Children & {
  imageSource: StaticImageData | string 
  imageAlt: string
}) => {
  useCheckLoggedInStatus(true)

  return (
    <Flex w="100dvw" minH="100dvh" justify="center" align="center">
      <Flex
        justifyContent={{md: "space-between"}}
        align={{md: "center"}}
        w="90%"
        mx="auto" 
        flexDir={{ base: 'column-reverse', md: 'row' }}>
        <Box textAlign={{ base: 'center', md: 'left' }} flexGrow="1" maxW={{md:"38%"}}>
          {children}
        </Box>
        <Box as={Flex} flexGrow="1" maxW={{ md: "60%" }} h={{ base: "30vh", md: "calc(100dvh - 160px)" }}>
          <Image
            src={imageSource}
            alt={imageAlt}
            style={{
              width: '100%',
              height: "100%",
              objectFit: "contain"
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
