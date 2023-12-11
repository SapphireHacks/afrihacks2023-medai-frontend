import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import EyeOffIcon from '@/assets/icons/eyeOff';

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const formHook = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      sex: '',
      dateOfBirth: ''
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formHook;

  return (
    <Box
      as="main"
      p="2rem"
      pt={{
        base: '0',
        md: '2rem'
      }}
    >
      <Box
        display={{
          base: 'flex',
          md: 'none'
        }}
        gap="1.5rem"
        mb="1.5rem"
      >
        <Avatar size="xl" />
        <Box>
          <Text fontSize="lg" fontWeight="550">
            John Doe
          </Text>
          <Text>johndoe@mail.com</Text>
        </Box>
      </Box>
      <Box
        h="4rem"
        textAlign="center"
        display={{
          base: 'none',
          md: 'block'
        }}
      >
        <Text as="h2" fontSize="2xl" fontWeight="550">
          Settings
        </Text>
      </Box>
      <Tabs colorScheme="green">
        <TabList>
          <Tab fontSize="base" fontWeight="500">
            Profile
          </Tab>
          <Tab fontSize="base" fontWeight="500">
            Password & security
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Avatar
              size="xl"
              mt="1.5rem"
              display={{
                base: 'none',
                md: 'block'
              }}
            />
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
                <FormControl>
                  <FormLabel fontSize="base" fontWeight="550">
                    Full Name
                  </FormLabel>
                  <Input
                    type="text"
                    h="5rem"
                    borderRadius="0.5rem"
                    fontSize="base"
                    placeholder="Enter your full name"
                    {...register('fullName', {
                      required: 'This field is required'
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="base" fontWeight="550">
                    Email Address
                  </FormLabel>
                  <Input
                    type="email"
                    h="5rem"
                    borderRadius="0.5rem"
                    fontSize="base"
                    placeholder="Enter your email address"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Entered value does not match email format'
                      }
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="base" fontWeight="550">
                    Sex
                  </FormLabel>
                  <Select h="5rem" borderRadius="0.5rem" fontSize="base">
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="base" fontWeight="550">
                    Date of Birth
                  </FormLabel>
                  <Input
                    type="date"
                    h="5rem"
                    borderRadius="0.5rem"
                    fontSize="base"
                    {...register('dateOfBirth', {
                      required: 'This field is required'
                    })}
                  />
                </FormControl>
              </Flex>
            </form>
          </TabPanel>
          <TabPanel>
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
                <FormControl isRequired>
                  <FormLabel fontSize="base" fontWeight="550">
                    New Password
                  </FormLabel>
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
                <FormControl isRequired>
                  <FormLabel fontSize="base" fontWeight="550">
                    Repeat Password
                  </FormLabel>
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
              </Flex>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

Settings.getLayout = (page: any) => (
  <ProtectedLayout title="Settings">{page}</ProtectedLayout>
);
Settings.requireAuth = true;
export default Settings;
