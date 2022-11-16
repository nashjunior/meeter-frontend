import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { HStack } from '@chakra-ui/layout';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegQuestionCircle } from 'react-icons/fa';
import {
  Flex,
  Input,
  Placement,
  Tooltip,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { forwardRef, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

registerLocale('pt-BR', ptBR);

interface IDatePickerProps extends ReactDatePickerProps {
  name?: string;
  label?: string;
  error?: FieldError;
  tipText?: string;
  tipPlacement?: Placement;
  required?: boolean;
}

const InputCustom = forwardRef(
  (
    {
      value,
      onClick,
      error = undefined,
      disabled,
      size,
      ...rest
    }: React.InputHTMLAttributes<HTMLInputElement> & { error?: FieldError },
    ref: LegacyRef<HTMLInputElement>,
  ) => (
    <Input
      value={value}
      onClick={onClick}
      ref={ref}
      focusBorderColor={error ? 'red.300' : '#999'}
      textTransform="uppercase"
      isInvalid={!!error}
      borderColor="#ddd"
      errorBorderColor="red.300"
      _hover={{ borderColor: '#aaa' }}
      _disabled={{ bgColor: '#e3e3e3', cursor: 'not-allowed' }}
      isRequired={false}
      disabled={disabled}
      {...rest}
      size={size || ('md' as any)}
      colorScheme="teal"
    />
  ),
);

InputCustom.displayName = 'DatePicker-input';
InputCustom.defaultProps = { error: undefined };

export const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  label,
  disabled,
  error = undefined,
  tipPlacement = 'bottom',
  required = false,
  tipText,
  ...rest
}) => {
  const color = useColorModeValue(
    'var(--chakra-colors-gray-700)',
    'var(--chakra-colors-teal-300)',
  );

  return (
    <Flex direction="column">
      <HStack alignItems="flex-start" spacing="0">
        {!!label && (
          <FormLabel htmlFor={name} aria-required={required}>
            {label}{' '}
            {required && (
              <span style={{ color: 'var(--chakra-colors-red-300)' }}>*</span>
            )}
          </FormLabel>
        )}
        {tipText && (
          <Tooltip label={tipText} placement={tipPlacement} hasArrow>
            <span>
              <FaRegQuestionCircle size="20px" color="blue" />
            </span>
          </Tooltip>
        )}
      </HStack>

      <ReactDatePicker
        {...rest}
        id={name}
        name={name}
        disabled={disabled}
        locale="pt-BR"
        strictParsing
        customInput={<InputCustom error={error} color={color} />}
      />

      {error && (
        <Text color="red.300" mt="2px">
          {error?.message}
        </Text>
      )}
    </Flex>
  );
};
