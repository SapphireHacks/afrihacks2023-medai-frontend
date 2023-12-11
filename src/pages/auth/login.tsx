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
import useAxios from '@/hooks/use-axios';
import toast from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import urls from '../../services/urls';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/user/slice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const { loading, makeRequest } = useAxios();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    if (!data) return;

    const result: any = await makeRequest({
      url: urls.loginUser,
      method: 'post',
      payload: data,
      token: null
    });
    console.log(result);
    try {
      if (!result) {
        return;
      }
      if (result.status === 'success') {
        console.log('success');
        toast.success(result.data.message || 'Login successful');
        dispatch(
          setUser({
            data: result.data.data.user,
            token: result.data.data.token
          })
        );
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(result.data.data));
        } else {
          sessionStorage.setItem('user', JSON.stringify(result.data.data));
        }
        router.push('/');
      } else if (result.status === 'error') {
        console.log('error', result.error);
        toast.error(result.error || 'An error occurred');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      throw new Error(error);
    }
  };

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
                      required: 'Password is required'
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
                  iconSize="2rem"
                  onChange={() => setRememberMe(!rememberMe)}
                  isChecked={rememberMe}
                >
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
                isLoading={loading}
              >
                Login
              </Button>
            </Flex>
          </form>
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
