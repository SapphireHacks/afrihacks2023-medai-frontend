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
    <Flex pt="6rem" justifyContent="space-between">
      <Box w="40%" ml="7rem">
        <Text fontSize="3xl" fontWeight="550">
          Welcome Back!
        </Text>
        <Text fontSize="xl" fontWeight="400">
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
              w="80%"
              placeholder="Enter your email address"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="lg">Password</FormLabel>
            <InputGroup size="md" w="80%">
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
          <Flex justifyContent="space-between" alignItems="center" w="80%">
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
            w="80%"
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
      </Box>
      <Box w="35%" h="100%" mx="auto">
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
