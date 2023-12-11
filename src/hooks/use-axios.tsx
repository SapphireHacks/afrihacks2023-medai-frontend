import { ResponseData } from '@/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

type Request<PType> = {
  payload?: PType;
  url: string;
  method: 'post' | 'delete' | 'patch' | 'put' | 'get';
  token: string | null;
};

type MakeRequest<RType extends ResponseData> = <PType>(
  args: Request<PType>
) => Promise<{
  data: RType | null;
  status: 'success' | 'error';
  error: unknown;
}>;

function useAxios<RType extends ResponseData>() {
  const [loading, setLoading] = useState<boolean>(false);
  const makeRequest: MakeRequest<RType> = useCallback(
    async ({ payload, method, url, token }) => {
      try {
        setLoading(true);
        const response: AxiosResponse<RType> = await axios({
          url,
          method,
          ...(payload && { data: payload }),
          ...(token && { headers: { Authorization: `Bearer ${token}` } })
        });
        if (response.data.status >= 400) {
          throw new Error(response.data.message);
        }

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
    []
  );

  return { loading, makeRequest };
}

export default useAxios;
