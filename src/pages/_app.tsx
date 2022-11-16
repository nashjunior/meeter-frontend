import '../services/apm.rum';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

export type INextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type IAppPropsWithLayout = AppProps & { Component: INextPageWithLayout };

const App = ({
  Component,
  pageProps,
}: IAppPropsWithLayout): React.ReactNode => {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  );
};

export default App;
