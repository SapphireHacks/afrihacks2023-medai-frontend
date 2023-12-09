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
import urls from '../../services/urls';
import useAxios from '@/hooks/use-axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const { loading, makeRequest } = useAxios();

  const formHook = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formHook;

  const submit: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data: any) => {
    if (!agreed) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    if (!data) return;

    const result: any = await makeRequest({
      url: urls.createUser,
      method: 'post',
      payload: data
    });
    if (!result) {
      return;
    }
    console.log(result);
    if (result.status === 'success') {
      toast.success(
        result.data.message ||
          'Account created successfully. Check your email to verify your account'
      );
    } else if (result.status === 'error') {
      if (result.error.includes('E11000')) {
        toast.error('This user already exists. Please login');
        return;
      }
      toast.error(result.error);
    }
  };

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

          <form onSubmit={handleSubmit(submit)}>
            <Flex flexDir="column" mt="2rem" gap="1.5rem">
              <FormControl isRequired>
                <FormLabel fontSize="lg">Email Address</FormLabel>
                <Input
                  type="email"
                  h="5rem"
                  borderRadius="0.5rem"
                  fontSize="base"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format'
                    }
                  })}
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
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password should be at least 6 characters'
                      }
                    })}
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
                <Checkbox
                  size="lg"
                  onChange={() => setAgreed(!agreed)}
                  isChecked={agreed}
                >
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
                isLoading={loading}
              >
                Sign up
              </Button>
            </Flex>
          </form>
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
