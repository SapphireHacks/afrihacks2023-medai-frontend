import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Show,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BasicInput } from "../auth/Inputs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AvatarUploadInput } from "./UserAvatarAndInfo";
import { useCallback, useState } from "react";
import { toFormData } from "axios";
import toast from "react-hot-toast";
import useAxios from "@/hooks/use-axios";
import urls from "@/services/urls";
import { User, setUserData } from "@/redux/user/slice";

const ProfileTab = () => {
  const dispatch = useAppDispatch()
  const [fileUpload, setFileUpload] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const { data: userData } = useAppSelector(store => store.user)

   console.log(userData, "heer")
  const formHook = useForm({
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      gender: userData?.gender,
      dob: userData?.dob,
      profileImage: userData?.profileImage || ""
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formHook;

  const { loading: isAxiosLoading, makeRequest } = useAxios()

  const onSubmit = useCallback(async (data: any) => {
    let dataToSubmit: { [x:string]: any}= {}
    if (fileUpload && fileUpload?.size >= 5000000) return toast.error("Image file is too large!")
    setLoading(true)
    for (const key in userData) {
      if(data[key] !== userData[key as keyof typeof userData]) dataToSubmit[key] = data[key]
    }
    dataToSubmit = toFormData(dataToSubmit)
    if(fileUpload) dataToSubmit.append("profileImage", fileUpload)
    let response
    try{
      response = await makeRequest({
      payload: dataToSubmit, 
      url: urls.updateUser,
      method: "put"
    })
    }catch(err: any){
      return toast.error(err?.message as string)
    }
    const { data: resData, message, status } = response.data as any || { data: null, status: null, message: ''}
    console.log(resData, status, message)
    if(status && status >= 200){
      dispatch(setUserData(resData.user))
      toast.success(message)
    }else{
      toast.error(message)
    }
    // const user = (response?.data as any)?.user as User["data"]
    // if (user) dispatch(setUserData(user))
    // else{
    //   toast.error("An error occurred! Please try again later.")
    //   formHook.reset({...userData})
    // }
    setLoading(false)
  }, [fileUpload])

  return (
    <VStack mt="1.2rem" spacing="1.2rem" align="start" maxW="60%">
      <Show above="md">
        <AvatarUploadInput hasUploaded={fileUpload !== undefined} imgSrc={userData?.profileImage || ""} onChange={(e) => setFileUpload(e.target.files?.[0])} />
      </Show>
      <VStack justify="start" align="start" spacing="1.3rem" w="100%">
        <BasicInput disabled={loading}
          labelText="First Name"
          placeholder={userData?.firstName || "Enter your first name"}
          {...register('firstName')}
        />
        <BasicInput disabled={loading}
          labelText="Last Name"
          placeholder={userData?.lastName || "Enter your last name"}
          {...register('lastName')}
        />
        <HStack justify="space-around" w="100%" spacing="1.2rem">
          <BasicInput
            labelText="Username"
            isDisabled
            placeholder={userData?.userName}
            _hover={{ borderColor: "text.200", }}
            borderColor="text.200"
          />
          <BasicInput
            labelText="Email Address"
            isDisabled
            placeholder={userData?.email}
            _hover={{ borderColor: "text.200", }}
            borderColor="text.200"
          />
        </HStack>
        <FormControl>
          <FormLabel fontSize="base" fontWeight="550">
            Sex
          </FormLabel>
          <Select 
          disabled={loading}
          {...register("gender")}
            _focusVisible={{ border: "1px solid", borderColor: "text.100" }} size="lg"
            sx={{ borderRadius: "12px", h: "5.8rem" }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormControl>
        <BasicInput disabled={loading} labelText="Date of Birth" type="date" {...register('dob')} />
      </VStack>
      <Button
       loadingText="Saving your data..."
       isLoading={loading}
        onClick={handleSubmit(onSubmit)}
        ml="auto"
        cursor="pointer"
        borderRadius="1.2rem"
        mt="2rem" 
        fontSize="1.8rem" 
        fontWeight="600" 
        h="unset" w="100%" 
        maxW="211px" 
        bg="primary.400" 
        color="white.main" 
        py="1.6rem" 
        px="2rem" 
        _hover={{ bg: "primary.700", }}>
          Save Changes
        </Button>
    </VStack>
  );
};

export default ProfileTab