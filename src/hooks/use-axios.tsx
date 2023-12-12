import { ResponseData } from '@/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type Request<PType> = {
  payload?: PType;
  url: string;
  method: 'post' | 'delete' | 'patch' | 'put' | 'get';
};

type MakeRequest<RType extends ResponseData> = <PType>(
  args: Request<PType>
) => Promise<{
  data: RType | null;
  status: 'success' | 'error';
  error: unknown;
}>;

function useAxios<RType extends ResponseData>() {
  const [token, setToken] = useState<string | null>(null)
  const getTokenFromStorage = useCallback(() => {
    const tokenInStorage = localStorage.getItem("token") || sessionStorage.getItem("token")
    console.log(tokenInStorage)
    if (tokenInStorage && tokenInStorage !== "undefined") return JSON.parse(tokenInStorage)
    else return ""
  }, [])
  useEffect(() => {
    setToken(getTokenFromStorage() || null)
  }, [getTokenFromStorage])

  const [loading, setLoading] = useState<boolean>(false);
  const makeRequest: MakeRequest<RType> = useCallback(
    async ({ payload, method, url }) => {
      console.log(token, "hellow")
      try {
        setLoading(true);
        const response: AxiosResponse<RType> = await axios({
          url,
          method,
          data: payload ,
         headers: { Authorization: `Bearer ${token || getTokenFromStorage()}`  }
        });
        console.log(response.status)
        return {
          data: response.data,
          status: 'success',
          error: null
        };
      } catch (error: unknown) {
        let message;
        if (error instanceof AxiosError) {
          const serverErrorMsg = error.response?.data?.message;
          if (serverErrorMsg) message = serverErrorMsg;
          else message = error.message;
        } else message = String(error);
        return { data: null, status: 'error', error: message };
      } finally {
        setLoading(false);
      }
    },
    [token, getTokenFromStorage]
  );

  return { loading, makeRequest };
}

export default useAxios;
