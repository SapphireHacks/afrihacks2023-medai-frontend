
import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
import { Children } from "@/types/index"

const LogoutButton = ({ children, onLogout }: Children & {
  onLogout?: () => void
}) => {

  const logUserOut = useCallback(() => {
    // logout code
    console.log("logout")
    if(onLogout) onLogout()
  }, [onLogout])

  return (
    <Flex as="button" onClick={logUserOut}>
      {children}
    </Flex>
  )
}

export default LogoutButton