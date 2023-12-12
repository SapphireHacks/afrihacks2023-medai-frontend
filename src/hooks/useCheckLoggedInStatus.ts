import { isTokenExpired } from "@/utils/checkToken";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./use-axios";
import urls from "@/services/urls";



export default function useCheckLoggedInStatus(shouldRedirectIfLoggedIn: boolean){
  const router = useRouter();
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  useEffect(() => {
    let token = sessionStorage.getItem("token") || localStorage.getItem("token")
    if(token) token = JSON.parse(token)
    if(!token) {
      if(!pathname.includes("auth")) {
        toast.error("Unauthorized to access this route!")
        router.push("/auth")
      }
    } else if (isTokenExpired(token)) {
        if(!pathname.includes("auth")) {
          router.push('/auth/login');
          toast.error('You are not authorized to view this page');
        }
    } else {
      if (shouldRedirectIfLoggedIn) {
        if(pathname.includes("/auth")) router.push("/")
      }
      setIsChecking(false)
    };
  }, [router, shouldRedirectIfLoggedIn]);

  return isChecking
}