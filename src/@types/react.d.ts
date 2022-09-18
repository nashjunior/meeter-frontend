import { ReactElement, ReactNode } from "react";

declare global {
  namespace React {
    interface FunctionComponent<P = {}> {
      // eslint-disable-next-line no-undef
      children?: React.ReactNode;
      getLayout?: (page: ReactElement) => ReactNode;
    }
  }
}
