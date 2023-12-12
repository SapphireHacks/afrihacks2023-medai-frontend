import { useRouter } from 'next/router';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import LoginImage from '@/assets/images/login-image.png';
import useAxios from '@/hooks/use-axios';
import toast from 'react-hot-toast';
import urls from '@/services/urls';

const VerifyEmail = () => {
  const router = useRouter();
  const { userId, emailVerificationToken } = router.query;
  const { loading, makeRequest } = useAxios();

  const verifyAccount = async () => {
    const result: any = await makeRequest({
      url: urls.verifyEmail(userId as string, emailVerificationToken as string),
      method: 'get',
      // token: null
    });
    if (!result) return;
    if (result.status === 'success') {
      toast.success('Account verified successfully. You can now login');
      router.push('/auth/login');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Box w="100%" textAlign="center" my="4rem">
      <Image
        src={LoginImage}
        alt="login illustration"
        style={{
          width: '30rem',
          height: '30rem',
          margin: '0 auto'
        }}
      />

      <Text fontSize="3xl" fontWeight="550">
        Verify your email
      </Text>
      <Text
        fontSize={{
          base: 'base',
          md: 'xl'
        }}
        fontWeight="400"
      >
        Click the button below to verify your email and complete your
        registration
      </Text>

      <Flex flexDir="column" mt="2rem" gap="1.5rem">
        <Button
          w="40%"
          mx="auto"
          h="4rem"
          borderRadius="0.5rem"
          fontSize="lg"
          fontWeight="400"
          bg="primary.900"
          mt="2rem"
          color="white"
          _hover={{ bg: 'primary.700' }}
          isLoading={loading}
          onClick={verifyAccount}
        >
          Verify Email
        </Button>
      </Flex>
    </Box>
  );
};

export default VerifyEmail;
