import { Children } from '@/types/index';
import { Show } from '@chakra-ui/react';
import DesktopLayout from './Desktop';
import MobileLayout from './Mobile';
import { configOptions } from '@/services/config';
import { isTokenExpired } from '@/utils/checkToken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingState from '@/components/loading-state';
import useConversationsSocket from '@/socket.io/sockets/useConversationsSocket';
import useMessagesSocket from '@/socket.io/sockets/useMessagesSocket';

const ProtectedLayout = ({
  children,
  title,
  HeaderActionItems
}: Children & {
  title: string;
  HeaderActionItems?: () => JSX.Element;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const config = configOptions();
  const token = config?.token;
  const tokenExpired = isTokenExpired(token);

  useEffect(() => {
    if (tokenExpired) {
      router.push('/auth/login');
      toast.error('You are not authorized to view this page');
    } else {
      setIsLoading(false);
    }
  }, [tokenExpired, router]);

  useConversationsSocket();
  useMessagesSocket()

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <Show above="md">
        <DesktopLayout>{children}</DesktopLayout>
      </Show>
      <Show below="md">
        <MobileLayout title={title} HeaderActionItems={HeaderActionItems}>
          {children}
        </MobileLayout>
      </Show>
    </>
  );
};

export default ProtectedLayout;
