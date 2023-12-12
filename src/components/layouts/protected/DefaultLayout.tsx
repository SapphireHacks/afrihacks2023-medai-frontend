import { Children } from '@/types/index';
import { Show } from '@chakra-ui/react';
import DesktopLayout from '../components/Desktop';
import MobileLayout from '../components/Mobile';
import LoadingState from '@/components/loading-state';
import useConversationsSocket from '@/socket.io/sockets/useConversationsSocket';
import useMessagesSocket from '@/socket.io/sockets/useMessagesSocket';
import { DesktopLogoutModal, MobileLogoutDrawer } from "@/components/auth/Logout";
import useCheckLoggedInStatus from "@/hooks/useCheckLoggedInStatus";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import { resetShowHospitalSearch } from "@/redux/hospital-search/slice";
import { updateActiveConversationId } from "@/redux/conversations/slice";

const ProtectedLayout = ({
  children,
  title,
  HeaderActionItems
}: Children & {
  title: string;
  HeaderActionItems?: () => JSX.Element;
}) => {
  const { showHospitalSearch } = useAppSelector(store => store.hospitalSearch)
  const { activeConversationId } = useAppSelector(store => store.conversations)
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const isChecking = useCheckLoggedInStatus(false)
  useConversationsSocket();
  useMessagesSocket();
  useEffect(() => {
    if(showHospitalSearch && pathname !== "/"){
      dispatch(resetShowHospitalSearch())
    }
    if(activeConversationId && pathname !== "/" && pathname !== "/history"){
      dispatch(updateActiveConversationId(null))
    }
  }, [pathname, showHospitalSearch, activeConversationId, dispatch])

  if (isChecking) {
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
      <DesktopLogoutModal/>
      <MobileLogoutDrawer/>
    </>
  );
};

export default ProtectedLayout;
