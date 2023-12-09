import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import SplashImg from '@/assets/images/medAI-white.png';
import Link from 'next/link';

const Onboarding = () => {
  return (
    <Flex
      p={{
        base: '2rem 1rem',
        md: '2rem 4rem'
      }}
      justifyContent="space-between"
      alignItems="center"
      flexDir={{
        base: 'column',
        md: 'row'
      }}
    >
      <Box
        w={{
          base: '60%',
          md: '40%'
        }}
        h="100%"
        mx="auto"
      >
        <Image
          src={SplashImg}
          alt="onboarding illustration"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
      <Box
        w={{
          base: '100%',
          md: '50%'
        }}
        mx="4rem"
        mt="4rem"
        textAlign="center"
      >
        <Text fontSize="3xl" fontWeight="550" mb="1rem">
          Your Personal Health Companion
        </Text>
        <Text
          fontSize={{
            base: 'sm',
            md: 'xl'
          }}
          fontWeight="400"
        >
          Experience the future of personalized healthcare with MedAI. We have
          you covered on symptom insights, personalized health advice, or
          proactive wellness tips
        </Text>
        <Button
          type="submit"
          h="4rem"
          w={{
            base: '100%',
            md: '80%'
          }}
          borderRadius="0.5rem"
          fontSize="lg"
          fontWeight="400"
          bg="primary.900"
          mt={{
            base: '5rem',
            md: '2rem'
          }}
          color="white"
          _hover={{ bg: 'primary.700' }}
        >
          <Link href="/auth/signup">Sign up</Link>
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
