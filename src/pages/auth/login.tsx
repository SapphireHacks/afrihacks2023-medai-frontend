import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text
} from '@chakra-ui/react';
import Image from 'next/image';
import LoginImage from '@/assets/images/login-image.png';
import { useState } from 'react';
import EyeOffIcon from '@/assets/icons/eyeOff';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      pt={{
        base: '3rem',
        md: '6rem'
      }}
      justifyContent="space-between"
      flexDir={{
        base: 'column-reverse',
        md: 'row'
      }}
      px={{
        base: '0',
        md: '8rem'
      }}
    >
      <Box
        w={{
          base: '90%',
          md: '50%'
        }}
        mx={{
          base: '2rem',
          md: 'unset'
        }}
        mt="4rem"
      >
        <Box
          w={{
            base: '100%',
            md: '80%'
          }}
          textAlign={{
            base: 'center',
            md: 'unset'
          }}
          mb="4rem"
        >
          <Text fontSize="3xl" fontWeight="550">
            Welcome Back!
          </Text>
          <Text
            fontSize={{
              base: 'base',
              md: 'xl'
            }}
            fontWeight="400"
          >
            Login to your account to continue
          </Text>

          <Flex flexDir="column" mt="2rem" gap="1.5rem">
            <FormControl isRequired>
              <FormLabel fontSize="lg">Email Address</FormLabel>
              <Input
                type="email"
                h="5rem"
                borderRadius="0.5rem"
                fontSize="base"
                placeholder="Enter your email address"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="lg">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  h="5rem"
                  borderRadius="0.5rem"
                  fontSize="base"
                  placeholder="Enter your password"
                />
                <InputRightElement width="4.5rem" mt="1.25rem">
                  <IconButton
                    bg="transparent"
                    h="1.5rem"
                    aria-label="hide password"
                    icon={<EyeOffIcon />}
                    onClick={handleClick}
                    _hover={{ bg: 'transparent' }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Flex justifyContent="space-between" alignItems="center">
              <Checkbox iconSize="2rem">
                <Text fontSize="sm">Remember me</Text>
              </Checkbox>

              <Link
                href="/auth/forgot-password"
                fontSize="sm"
                color="primary.900"
                _hover={{ textDecoration: 'none' }}
              >
                Forgot Password?
              </Link>
            </Flex>
            <Button
              type="submit"
              h="4rem"
              borderRadius="0.5rem"
              fontSize="lg"
              fontWeight="400"
              bg="primary.900"
              mt="2rem"
              color="white"
              _hover={{ bg: 'primary.700' }}
            >
              Login
            </Button>
          </Flex>
          <Text textAlign="center" fontSize="lg" fontWeight="400" mt="2rem">
            I have don&apos;t an account?{' '}
            <Link href="/auth/signup">
              <Text
                as="span"
                color="primary.900"
                fontWeight="600"
                cursor="pointer"
              >
                Sign up
              </Text>
            </Link>
          </Text>
        </Box>
      </Box>
      <Box
        w={{
          base: '80%',
          md: '45%'
        }}
        mx="auto"
      >
        <Image
          src={LoginImage}
          alt="login illustration"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
    </Flex>
  );
};

export default Login;
