
import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
import { Children } from "@/types/index"
import { useRouter } from "next/navigation"

const LogoutButton = ({ children, onLogout }: Children & {
  onLogout?: () => void
}) => {
  const router = useRouter()
  const logUserOut = useCallback(() => {
    sessionStorage.removeItem("user")
    router.push("/")
    if(onLogout) onLogout()
  }, [onLogout])

  return (
    <Flex as="button" onClick={logUserOut}>
      {children}
    </Flex>
  )
}

export default LogoutButton