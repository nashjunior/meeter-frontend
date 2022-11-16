/* eslint-disable react/require-default-props */
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { HStack } from '@chakra-ui/layout';
import { Placement, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { FaQuestionCircle } from 'react-icons/fa';
import ReactSelect, { GroupBase, Props } from 'react-select';

type IOption = { label: string; value: any };

type ISelectProps = Props<IOption, false, GroupBase<IOption>> & {
  name?: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  isDisabled?: boolean;
  tipText?: string;
  tipPlacement?: Placement;
};

export const Select: React.FC<ISelectProps> = ({
  name,
  label,
  error = undefined,
  options,
  placeholder = 'Digite...',
  isDisabled,
  required = false,
  tipPlacement,
  tipText,
  value,
  ...rest
}) => {
  const color = useColorModeValue(
    'var(--chakra-colors-gray-700)',
    'var(--chakra-colors-teal-300)',
  );

  const background = useColorModeValue(
    undefined,
    'var(--chakra-colors-chakra-gray-700)',
  );

  const customStyles = {
    container: (base: any) => ({
      ...base,
      color: isDisabled ? '#999' : color,
      transition:
        'border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease',
    }),
    control: (base: any) => ({
      ...base,
      background: isDisabled ? '#e3e3e3' : background,
      color: isDisabled ? '#999' : color,
      minHeight: '40px',
      borderRadius: '6px',
      paddingLeft: '8px',
      paddingRight: '8px',

      fontSize: '16px',
      boxShadow: '#aaa',
      borderColor: error ? '#ff3030' : '#ddd',
      '&:focus': {
        borderColor: error ? '#ff3030' : '#aaa',
        boxShadow: error ? '#ff3030' : '#aaa',
      },
      '&:hover': {
        borderColor: error ? '#ff3030' : '#aaa',
        boxShadow: error ? '#ff3030' : '#aaa',
      },
      '&:active': {
        borderColor: error ? '#ff3030' : '#aaa',
        boxShadow: error ? '#ff3030' : '#aaa',
      },
      '&:focus-within': {
        borderColor: error ? '#ff3030' : '#aaa',
        boxShadow: error ? '#ff3030' : '#aaa',
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      background: isDisabled ? '#e3e3e3' : background,
    }),
    input: (base: any) => ({ ...base, color }),
    singleValue: (base: any) => ({ ...base, color }),
  };

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <HStack alignItems="flex-start" spacing={0}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        {tipText && (
          <Tooltip label={tipText} placement={tipPlacement} hasArrow>
            <span>
              <FaQuestionCircle size="20px" color="blue" />
            </span>
          </Tooltip>
        )}
      </HStack>
      <ReactSelect
        {...rest}
        isMulti={false}
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        noOptionsMessage={() => 'Sem opções'}
        className="basic-select"
        classNamePrefix="select"
        value={value || null}
        isDisabled={isDisabled}
      />

      <FormErrorMessage mt="2px">{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
