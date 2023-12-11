import { Button } from '@chakra-ui/react';
import { Children } from '@/types/index';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/use-axios';
import urls from '@/services/urls';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/hooks';

const LogoutButton = ({ children }: Children) => {
  const token = useAppSelector(state => state.user.token);
  const { makeRequest, loading } = useAxios();
  const router = useRouter();
  const logUserOut = async () => {
    try {
      await makeRequest({
        url: urls.logoutUser,
        method: 'get',
        token
      });
      router.push('/auth/login');
      sessionStorage.removeItem('user');
      toast.success('Logout Successful!');
    } catch (error: any) {
      toast.error('Logout Failed. Please try again.');
    }
  };

  return (
    <Button
      w="100%"
      h="4rem"
      borderRadius=".5rem"
      onClick={logUserOut}
      disabled={loading}
      _hover={{
        cursor: 'pointer',
        bgColor: 'white'
      }}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
