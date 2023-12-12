
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/use-axios';
import urls from '@/services/urls';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetShouldLogout, updateShouldLogout } from "@/redux/user/slice";
import { useCallback } from "react";


export const useLogUserOut = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.user.token);
  const { makeRequest } = useAxios();
  const router = useRouter();
  const logUserOut = useCallback(async () => {
    try {
      await makeRequest({
        url: urls.logoutUser,
        method: 'get',
        token
      });
      dispatch(resetShouldLogout())
      router.push('/auth/login');
      sessionStorage.removeItem('user');
      toast.success('Logout Successful!');
    } catch (error: any) {
      toast.error('Logout Failed. Please try again.');
    }
  }, [makeRequest, router]);
  return logUserOut
}

