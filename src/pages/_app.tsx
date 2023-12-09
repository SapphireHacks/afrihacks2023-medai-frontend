import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import themes from '@/utils/themes';
import { NextPageWithLayout } from '@/types';
import { Toaster } from 'react-hot-toast';

type Props = {
  Component: NextPageWithLayout;
  pageProps: any;
} & AppProps;

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ChakraProvider theme={themes}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </ChakraProvider>
  );
}
