import { ResponseData } from '@/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type Request<PType> = {
  payload?: PType;
  url: string;
  method: 'post' | 'delete' | 'patch' | 'put' | 'get';
  token?: string;
};

type MakeRequest<RType extends ResponseData> = <PType>(
  args: Request<PType>
) => Promise<{
  data: RType | null;
  error: unknown;
}>;

function useAxios<RType extends ResponseData>() {
  const getTokenFromStorage = useCallback(() => {
    const tokenInStorage = localStorage.getItem("token") || sessionStorage.getItem("token")
    if (tokenInStorage && tokenInStorage !== "undefined") return JSON.parse(tokenInStorage)
    else return ""
  }, [])

  const [loading, setLoading] = useState<boolean>(false);
  const makeRequest: MakeRequest<RType> = useCallback(
    async ({ payload, method, url, token }) => {
      try {
        setLoading(true);
        const response: AxiosResponse<RType> = await axios({
          url,
          method,
          data: payload ,
         headers: { Authorization: `Bearer ${getTokenFromStorage()}`  }
        });
        console.log(response.status)
        return {
          data: response.data,
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
    [getTokenFromStorage]
  );

  return { loading, makeRequest };
}

export default useAxios;
