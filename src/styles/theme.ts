import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = { initialColorMode: 'light' };

export const theme = extendTheme({
  colors: {
    primary: {
      500: '#48b461',
    },
    green: {
      500: '#1a8d4c',
    },
    gray: {
      900: '#181823',
      800: '#1F2029',
      700: '#353646',
      600: '#4B4D63',
      500: '#616480',
      400: '#797D9A',
      300: '#9699B0',
      200: '#B3B5C6',
      100: '#D1D2DC',
      50: '#EEEEF2',
    },
  },
  fonts: { heading: 'Roboto', body: 'Roboto' },
  config,
});
