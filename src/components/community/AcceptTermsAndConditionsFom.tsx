
import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import {
  Box,
  useDisclosure,
  Checkbox,
  Text,
  Button,
  Flex,
  FormLabel,
} from '@chakra-ui/react';
import Image from 'next/image';
import CommunityImg from '@/assets/images/community-image.png';
import useAxios from "@/hooks/use-axios";
import { useForm } from "react-hook-form";
import urls from "@/services/urls";

export default function AcceptTermsAndConditionsForm(){
  const { loading, makeRequest } = useAxios();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      hasAcceptedCommunityTerms: false
    }
  });
  const submit = async (data: any) => {
    const result = await makeRequest({
      url: urls.updateUser,
      method: 'put',
      payload: data
    });


  };
  return (
    <Flex
      pos="absolute"
      bg="white"
      flexDir="column"
      gap="1.5rem"
      w="100%"
      h="max-content"
      zIndex="100"
      textAlign="center"
      py={{
        base: '0',
        md: '4rem'
      }}
      px={{
        base: '2rem',
        md: '15rem'
      }}
    >
      <Box
        w={{
          base: '80%',
          md: '40%'
        }}
        mx="auto"
        mt="2.5rem"
      >
        <Image
          src={CommunityImg}
          alt="Community illustration"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
      <Text
        fontSize={{
          base: '2xl',
          md: '3xl'
        }}
        fontWeight="550"
      >
        Welcome to Our Health Community: Sharing Tips and Testimonies
      </Text>
      <Text
        fontSize={{
          base: 'sm',
          md: 'lg'
        }}
      >
        Join our dynamic Health Community, where members exchange valuable
        health tips, share inspiring testimonies, and support one another on
        their wellness journeys.
      </Text>
      <form onSubmit={handleSubmit(submit)}>
        <FormLabel
          htmlFor="join-community"
          fontSize={{
            base: 'xs',
            md: 'sm'
          }}
          textAlign="center"
          mt="1rem"
          display="flex"
          alignItems="flex-start"
        >
          <Checkbox
            size="lg"
            {...register('hasAcceptedCommunityTerms', {
              required: true
            })}
          />
          By selecting this, you acknowledge and agree to adhere to our
          community&apos;s guidelines, fostering a positive and supportive
          environment for all members.
        </FormLabel>

        <Box>
          <Button
            h="4rem"
            w={{
              base: '100%',
              md: '50%'
            }}
            borderRadius="0.5rem"
            fontSize="lg"
            fontWeight="400"
            bg="primary.900"
            mt="2rem"
            color="white"
            _hover={{ bg: 'primary.700' }}
            type="submit"
            isLoading={loading}
          >
            Join our community
          </Button>
        </Box>
      </form>
    </Flex>
  )
}