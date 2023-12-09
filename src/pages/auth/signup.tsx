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
  Text
} from '@chakra-ui/react';
import Image from 'next/image';
import SignUpImage from '@/assets/images/signup-image.png';
import EyeOffIcon from '@/assets/icons/eyeOff';
import { useState } from 'react';
import Link from 'next/link';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      pt="6rem"
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
            Create Account
          </Text>
          <Text
            fontSize={{
              base: 'base',
              md: 'xl'
            }}
            fontWeight="400"
          >
            Discover a Healthier You - Sign Up on MedAI
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
              <Checkbox size="lg">
                <Text fontSize="base">
                  I agree with the{' '}
                  <Text as="span" color="primary.900" fontWeight="600">
                    Terms and conditions of MedAI
                  </Text>
                </Text>
              </Checkbox>
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
              Sign up
            </Button>
          </Flex>
          <Text textAlign="center" fontSize="lg" fontWeight="400" mt="2rem">
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
      </Box>
      <Box
        w={{
          base: '80%',
          md: '45%'
        }}
        mx="auto"
      >
        <Image
          src={SignUpImage}
          alt="signup illustration"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
    </Flex>
  );
};

export default SignUp;
