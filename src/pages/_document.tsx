/* eslint-disable object-curly-newline */
import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, NextScript, Main } from 'next/document';
import { theme } from '../styles/theme';

// eslint-disable-next-line @typescript-eslint/naming-convention
class Document extends NextDocument {
  // eslint-disable-next-line no-undef
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/images/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
