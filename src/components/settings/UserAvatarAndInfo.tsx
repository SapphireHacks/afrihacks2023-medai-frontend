import CameraIcon from "@/assets/icons/cameraIcon";
import {
  Box,
  Text,
  Avatar,
  Center,
  InputProps,
} from '@chakra-ui/react';

const UserAvatarAndInfo = () => {

  return (
    <Box>
      <Box>
        <Avatar size="xl" />
        <Box>
          <Text fontSize="lg" fontWeight="550">
            John Doe
          </Text>
          <Text>johndoe@mail.com</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UserAvatarAndInfo

export function AvatarUploadInput({ imgSrc, onChange, hasUploaded }: {
  imgSrc: string, 
  hasUploaded: boolean
} &  InputProps){
  return (
      <Box position="relative">
        <Avatar size="xl" src={imgSrc} sx={{ width: "100px", height: "100px" }} />
      <Box type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" as="input" w="0" h="0"    onChange={onChange} ></Box>
      <Center color={hasUploaded ? "green" : "white"} border={`${hasUploaded === true ? "3px solid" : ""}`} w="50px" h="50px" borderRadius="50%" boxShadow="0px 0px 6px #0000006e" as="label" htmlFor="avatar" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <CameraIcon />
        </Center>
      </Box>
  )
}