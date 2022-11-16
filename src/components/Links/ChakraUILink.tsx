import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { LinkProps as NextLinkProps } from 'next/link';

export type INextChakraLinkProps = React.PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, 'as'>
>;

export const LinkChakra: React.FC<INextChakraLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}) => {
  return (
    <NextLink
      passHref
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </NextLink>
  );
};
