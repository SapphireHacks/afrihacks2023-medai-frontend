import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import SplashImg from '@/assets/images/medAI-white.png';
import Link from 'next/link';
import useCheckLoggedInStatus from "@/hooks/useCheckLoggedInStatus";

const Onboarding = () => {

  useCheckLoggedInStatus(true)
  return (
    <Flex
      h="100dvh"
      justifyContent="center"
      alignItems="center"
      flexDir={{
        base: 'column',
        md: 'row'
      }}
    >
      <Box
        maxW={{ md: "33%"}}
        flexGrow="1" maxH={{base: "35dvh", md: "unset"}} position="relative">
        <Image
          src={SplashImg}
          alt="onboarding illustration"
          width={100}
          height={100}
          style={{
            width: '100%',
            height: '100%',
            objectFit: "contain"
          }}
        />
      </Box>
      <Box textAlign="center" maxW={{ base: "88%", md: "47.5%"}}>
        <Text as="h1" lineHeight="100%" fontSize={{base: "3rem", md: "6rem"}} fontWeight="600" mb="1.6rem">
          Your Personal Health Companion
        </Text>
        <Text
          fontSize={{
            base: '1.6rem',
            md: '2.4rem'
          }}
          lineHeight="125%"
          fontWeight="400">
          Experience the future of personalized healthcare with MedAI. We have you covered on symptom insights, personalized health advice, or proactive wellness tips
        </Text>
        <Button 
          as={Link} 
          href="/auth/signup"
          h="unset"
          w={{
            base: '100%',
            md: '70%'
          }}
          p="1.5rem"
          fontSize="lg"
          fontWeight="400"
          bg="primary.900"
          mt={{
            base: '8rem',
            md: '4rem'
          }}
          color="white"
          _hover={{ bg: 'primary.700' }}
          borderRadius="10px"
        >
          Sign up
        </Button>
        <Text
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
          fontWeight="400"
          mt={{
            base: '0.5rem',
            md: '2rem'
          }}
        >
          I have an account?{' '}
          <Link href="/auth/login">
            <Text
              as="span"
              color="primary.900"
              fontWeight="600"
              cursor="pointer"
            >
              Log in
            </Text>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Onboarding;
