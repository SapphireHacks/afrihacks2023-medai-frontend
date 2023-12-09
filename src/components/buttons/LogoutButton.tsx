
import { Box } from "@chakra-ui/react"
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
    <Box as="button" onClick={logUserOut}>
      {children}
    </Box>
  )
}

export default LogoutButton