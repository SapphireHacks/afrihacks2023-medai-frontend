import { Flex, FormControl, FormLabel, InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react";

import EyeOffIcon from '@/assets/icons/eyeOff';

export default function ChangePasswordTab(){
  return (

    <form>
      <Flex
        flexDir="column"
        mt="2rem"
        gap="1.5rem"
        w={{
          base: '100%',
          md: '50%'
        }}
      >
        <FormControl isRequired>
          <FormLabel fontSize="base" fontWeight="550">
            Current Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={true ? 'text' : 'password'}
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
                // onClick={handleClick}
                _hover={{ bg: 'transparent' }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontSize="base" fontWeight="550">
            New Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={true ? 'text' : 'password'}
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
                // onClick={handleClick}
                _hover={{ bg: 'transparent' }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontSize="base" fontWeight="550">
            Repeat Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={true ? 'text' : 'password'}
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
                // onClick={handleClick}
                _hover={{ bg: 'transparent' }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>
    </form>
  )
}