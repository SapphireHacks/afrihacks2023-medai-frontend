import { Box, Checkbox, Flex, Link, Text, VStack } from '@chakra-ui/react';
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
import {
  BasicInput,
  PasswordTypeInput,
  SubmitButton
} from '@/components/auth/Inputs';
import { FormHeading, Paragraph } from '@/components/auth/Text';
import Layout from '@/components/auth/Layout';

const Login = () => {
  const { loading, makeRequest } = useAxios();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formHook = useForm({
    defaultValues: {
      emailOrUserName: '',
      password: ''
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formHook;

  const submit: SubmitHandler<{
    emailOrUserName: string;
    password: string;
  }> = async (data: any) => {
    if (!data) return;

    let result: any;
    try {
      result = await makeRequest({
        url: urls.loginUser,
        method: 'post',
        payload: data
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
    if (!result) return toast.error('Something went wrong!');
    if (result.status !== 'success') {
      return toast.error(result.message || result.error);
    } else {
      const { data } = result;
      let user = data.data.user,
        token = data.data.token,
        hasAcceptedCommunityTerms = data.data.user.hasAcceptedCommunityTerms;
      if (rememberMe) {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem(
          'hasAcceptedCommunityTerms',
          JSON.stringify(hasAcceptedCommunityTerms)
        );
      } else {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem(
          'hasAcceptedCommunityTerms',
          JSON.stringify(hasAcceptedCommunityTerms)
        );
      }
      dispatch(setUser(user));
      toast.success(data.message || 'Login successful');
      router.push('/');
    }
  };

  return (
    <Layout imageSource={LoginImage} imageAlt={'Login Illustration'}>
      <Box w="100%">
        <FormHeading>Welcome Back!</FormHeading>
        <Paragraph>Login to your account to continue</Paragraph>

        <VStack
          as="form"
          spacing="2.4rem"
          w="100%"
          onSubmit={handleSubmit(submit)}
        >
          <Flex flexDir="column" mt="2rem" gap="1.5rem" w="100%">
            <BasicInput
              required
              labelText="Email Address/Username"
              placeholder="Enter your preferred username"
              type="text"
              {...register('emailOrUserName', {
                required: 'This field is required'
              })}
            />

            <PasswordTypeInput
              required
              labelText="Password"
              placeholder="Enter your password"
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
            />
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
            <SubmitButton loading={loading}>Login</SubmitButton>
          </Flex>
        </VStack>
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
    </Layout>
  );
};

export default Login;
