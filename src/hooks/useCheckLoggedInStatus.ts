import { isTokenExpired } from "@/utils/checkToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function useCheckLoggedInStatus(shouldRedirectIfLoggedIn: boolean){
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true)
  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token")
    if(!token) {
      toast.error("Unauthorized to access this route!")
      return router.push("/auth")
    }
    if (isTokenExpired(token)) {
      router.push('/auth/login');
      toast.error('You are not authorized to view this page');
    } else {
      if (shouldRedirectIfLoggedIn) router.push("/")
      setIsChecking(false)
    };
  }, [router, shouldRedirectIfLoggedIn]);
  return isChecking
}