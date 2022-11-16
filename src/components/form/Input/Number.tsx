import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Placement,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { FaQuestionCircle } from 'react-icons/fa';

interface IInputProps extends NumberInputProps {
  name?: string;
  label?: string;
  tipText?: string;
  tipPlacement?: Placement;
  mask?: string;
  error?: FieldError;
}

const InputNumberBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  IInputProps
> = (
  {
    name,
    label,
    tipText,
    tipPlacement = 'bottom',
    error = undefined,
    isRequired,
    ...rest
  },
  ref,
) => {
  const color = useColorModeValue(undefined, 'teal.300');

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

      <NumberInput
        {...rest}
        focusBorderColor={error ? 'red.300' : '#999'}
        isInvalid={!!error}
        borderColor="#ddd"
        errorBorderColor="red.300"
        _hover={{ borderColor: '#aaa' }}
        _disabled={{ bgColor: '#e3e3e3', cursor: 'not-allowed' }}
        color={color}
      >
        <NumberInputField ref={ref} required={false} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <FormErrorMessage mt="2px">{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const InputNumber = forwardRef(InputNumberBase);
