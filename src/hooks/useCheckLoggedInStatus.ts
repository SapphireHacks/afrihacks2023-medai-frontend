import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isTokenExpired } from "@/utils/checkToken";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./use-axios";
import urls from "@/services/urls";
import { setUserData } from "@/redux/user/slice";



export default function useCheckLoggedInStatus(shouldRedirectIfLoggedIn: boolean){
  const dispatch = useAppDispatch()
  const { makeRequest } = useAxios();
  const router = useRouter();
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const { data: userData } = useAppSelector(store => store.user)

  const fetchLoggedInUser = useCallback(async (token: string) => {
    const response = await makeRequest({
      method: "get",
      url: urls.getUser
    })
    const data = response.data as any
    if(data.data.user) dispatch(setUserData(data.data.user))
  }, [])
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
      if(userData === null){
        fetchLoggedInUser(token)
      }
      if (shouldRedirectIfLoggedIn) {
        if(pathname.includes("/auth")) router.push("/")
      }
      setIsChecking(false)
    };
  }, [router, shouldRedirectIfLoggedIn, pathname]);

  return isChecking
}