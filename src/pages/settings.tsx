import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Show
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserAvatarAndInfo from "@/components/settings/UserAvatarAndInfo";
import Header from "@/components/settings/Header";
import ProfileTab from "@/components/settings/ProfileTab";
import ChangePasswordTab from "@/components/settings/ChangePasswordTab";

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
      
      <Show above="md">
        <Header title="Settings"/>
      </Show>
      <Show below="md">
        <UserAvatarAndInfo/>
      </Show>
      <Tabs colorScheme="green">
        <TabList>
          <Tab fontSize="1.6rem" fontWeight="600">
            Profile
          </Tab>
          <Tab fontSize="1.6rem" fontWeight="600">
            Password & security
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel w={{ lg: "100%"}}>
           <ProfileTab/>
          </TabPanel>
          <TabPanel>
            <ChangePasswordTab/>
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
