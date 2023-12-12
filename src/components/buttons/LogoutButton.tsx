import { Flex } from '@chakra-ui/react';
import { Children } from '@/types/index';
import { useAppDispatch } from '@/redux/hooks';
import { updateShouldLogout } from "@/redux/user/slice";

export const InitiateLogoutButton = ({ children }: Children) => {

  const dispatch = useAppDispatch()
  return (
    <Flex as="button" onClick={() => dispatch(updateShouldLogout(true))}>
      {children}
    </Flex>
  )
}
