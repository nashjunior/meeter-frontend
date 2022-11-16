import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Placement,
  Tooltip,
  useColorModeValue,
  InputProps,
} from '@chakra-ui/react';

import { FieldError } from 'react-hook-form';
import { FaQuestionCircle } from 'react-icons/fa';
import IntlCurrencyInput from 'react-intl-currency-input';

interface IInputProps extends Omit<InputProps, 'onChange'> {
  name?: string;
  label?: string;
  tipText?: string;
  tipPlacement?: Placement;
  mask?: string;
  error?: FieldError;
  isRequired: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLInputElement>,
    value: number,
    maskedValue: string,
  ) => void;
}

export const InputCurrency: React.FC<IInputProps> = (
  {
    onChange,
    name,
    label,
    tipText,
    tipPlacement = 'bottom',
    error = undefined,
    isRequired,
    w,
    width,
    minW,
    minWidth,
    height,
    h,
    size,
    fontSize,
    borderRadius,
    borderWidth,
    paddingInlineStart,
    paddingInlineEnd,
    outline,
    outlineOffset,
    transitionProperty,
    transitionDuration,
    borderColor,
    background,
    ...rest
  },
  ref,
) => {
  const color = useColorModeValue(undefined, 'teal.300');
  const defaultBorderWidth = borderWidth || 1;
  const defaultOutline = outline || 'transparent solid 2px';
  const defaultOutlineOffset = outlineOffset || 2;
  const defaultTransitionProperty =
    transitionProperty || 'var(--chakra-transition-property-common)';

  const defaultTransitionDuration =
    transitionDuration || 'var(--chakra-transition-duration-normal)';

  const defaultBorderColor = error
    ? 'var(--chakra-colors-red-500)'
    : borderColor;

  const defaultBackground = background || 'inherit';

  let defaultHeight: any = '';
  let defaultPaddinInlineStart: any = '';
  let defaultPaddinInlineEnd: any = '';

  switch (size) {
    case 'xs':
      defaultHeight = 'var(--chakra-sizes-6)';
      defaultPaddinInlineStart = 'var(--chakra-space-2)';
      defaultPaddinInlineEnd = 'var(--chakra-space-2)';
      break;

    case 'sm':
      defaultHeight = 'var(--chakra-sizes-8)';
      defaultPaddinInlineStart = 'var(--chakra-space-3)';
      defaultPaddinInlineEnd = 'var(--chakra-space-3)';
      break;

    case 'md':
      defaultHeight = 'var(--chakra-sizes-10)';
      defaultPaddinInlineStart = 'var(--chakra-space-4)';
      defaultPaddinInlineEnd = 'var(--chakra-space-4)';

      break;

    case 'lg':
      defaultHeight = 'var(--chakra-sizes-12)';
      defaultPaddinInlineStart = 'var(--chakra-space-4)';
      defaultPaddinInlineEnd = 'var(--chakra-space-4)';

      break;

    default:
      defaultHeight = height || h || 'var(--chakra-sizes-10)';
      defaultPaddinInlineStart = paddingInlineStart || 'var(--chakra-space-4)';
      defaultPaddinInlineEnd = paddingInlineEnd || 'var(--chakra-space-4)';
      break;
  }

  let defaultFontSize: any = '';
  switch (fontSize) {
    case 'xs':
      defaultFontSize = 'var(--chakra-fontSizes-xs)';
      break;

    case 'sm':
      defaultFontSize = 'var(--chakra-fontSizes-sm)';
      break;

    case 'md':
      defaultFontSize = 'var(--chakra-fontSizes-md)';
      break;

    case 'lg':
      defaultFontSize = 'var(--chakra-fontSizes-lg)';
      break;

    default:
      defaultFontSize = fontSize || 'var(--chakra-fontSizes-md)';
      break;
  }

  const defaultBorderRadius =
    borderRadius || `var(--chakra-radii-${borderRadius || 'md'})`;

  const currencyConfig = {
    locale: 'pt-BR',
    formats: {
      number: {
        USD: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <HStack alignItems="flex-start" spacing="0">
        {!!label && (
          <FormLabel htmlFor={name}>
            {label}
            {tipText && (
              <Tooltip label={tipText} placement={tipPlacement} hasArrow>
                <span style={{ marginLeft: 2 }}>
                  <FaQuestionCircle size="20px" color="teal.300" />
                </span>
              </Tooltip>
            )}
          </FormLabel>
        )}
      </HStack>
      <IntlCurrencyInput
        {...rest}
        id={name}
        name={name}
        ref={ref}
        onChange={onChange}
        required={isRequired}
        config={currencyConfig}
        style={{
          ...rest,
          color,
          background: defaultBackground,
          width: w || width || '100%',
          minWidth: minW || minWidth || 0,
          height: defaultHeight,
          fontSize: defaultFontSize,
          borderColor: defaultBorderColor,
          borderRadius: defaultBorderRadius,
          paddingInlineStart: defaultPaddinInlineStart,
          paddingInlineEnd: defaultPaddinInlineEnd,
          borderWidth: defaultBorderWidth,
          outline: defaultOutline,
          outlineOffset: defaultOutlineOffset,
          transitionProperty: defaultTransitionProperty,
          transitionDuration: defaultTransitionDuration,
        }}
      />
      <FormErrorMessage mt="2px">{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
