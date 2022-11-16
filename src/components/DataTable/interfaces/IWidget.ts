import { ButtonProps } from '@chakra-ui/react';
import { IconBaseProps } from 'react-icons';

export type IWidgetType = {
  tooltip: string;
  component: React.ReactElement<IconBaseProps>;
  action?: () => void;
  colorScheme?: ButtonProps['colorScheme'];
};
