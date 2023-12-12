import {
  Checkbox,
  Flex,
  VStack,
  Text
} from '@chakra-ui/react';
import SignUpImage from '@/assets/images/signup-image.png';
import Link from 'next/link';
import urls from '../../services/urls';
import useAxios from '@/hooks/use-axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BasicInput, PasswordTypeInput, SubmitButton } from "@/components/auth/Inputs";
import { FormHeading, Paragraph } from "@/components/auth/Text";
import Layout from "@/components/auth/Layout";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter()
  const { loading, makeRequest } = useAxios();

  const formHook = useForm({
    defaultValues: {
      email: '',
      password: '',
      hasAcceptedAppTermsOfService: false,
      userName: ''
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
    userName: string
  }> = async (data: any) => {
    let result: any
     try{
       result = await makeRequest({
         url: urls.createUser,
         method: 'post',
         payload: data,
       });
     }catch(err: any){
      toast.error(err?.message)
     }
     if(!result) toast.error("Something went wrong!")
     else if (result.status !== "success") {
        const errMsg = result.error || result.message
       if (errMsg?.includes("E11000"))return toast.error(`It appears you already have an account. Try logging in!`)
       else toast.error(result.message || result.error)
     } else {
      toast.success('Welcome to MedAI! Check your email to verify your account');
      router.push("/auth/login")
      toast.success("You can now login to your account!")
     }
  };

  return (
    <Layout imageSource={SignUpImage} imageAlt={"Signup Illustration"}>
      <Flex w="100%" flexDir="column">
        <FormHeading>Create Account</FormHeading>
        <Paragraph>Discover a Healthier You - Sign Up on MedAI</Paragraph>
        <VStack as="form" spacing="2.4rem" onSubmit={handleSubmit(submit)} w="100%" >
          <Flex flexDir="column" mt="2rem" gap="1.5rem" w="full">
            <BasicInput
              labelText="Username"
              placeholder="Enter your preferred username"
              type="text"
              {...register('userName', {
                required: 'Username is required',
                pattern: {
                  value: /^[a-zA-Z\-]+$/,
                  message: 'Entered value does not match username format'
                }
              })}
            />
            <BasicInput
              labelText="Email Address"
              placeholder="Enter your email address"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format'
                }
              })}
            />
            <PasswordTypeInput
              labelText="Password"
              placeholder="Enter your password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters'
                }
              })}
            />

            <Flex align="start" gap="1.2rem" mt="1.4rem">
              <Checkbox
                size="lg"
                {...register('hasAcceptedAppTermsOfService', {
                  required: 'Please accept the terms and conditions'
                })}
              >
                <Text fontSize="1.4rem">
                  I agree with the
                  <Text textDecor="underline" as="span" color="primary.900" fontWeight="600">
                    Terms and conditions of MedAI
                  </Text>
                </Text>
              </Checkbox>
            </Flex>
          </Flex>
          <SubmitButton loading={loading}>Sign up</SubmitButton>
        </VStack>
        <Text textAlign="center" fontSize="lg" fontWeight="400" mt="2rem">
          I have an account?
          <Text
            as={Link}
            href="/auth/login"
            color="primary.900"
            fontWeight="600"
            cursor="pointer"
          > Log in </Text>
        </Text>
      </Flex>
    </Layout>
  )
};

export default SignUp;
