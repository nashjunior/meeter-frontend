import { Flex } from '@chakra-ui/layout';
import { Button, Input } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface IProps {
  handleChangeSearch(event: ChangeEvent<HTMLInputElement>): void;
  searchInput: string;
}

const FormInputSearch: React.FC<IProps> = ({
  handleChangeSearch,
  searchInput,
}) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      border="1px solid #ddd"
      borderRadius="4px"
      background="#fff"
      height="35px"
      padding="0px 8px 0px 4px"
    >
      <Input onChange={handleChangeSearch} value={searchInput} />
      <Button type="button">
        <FaSearch />
      </Button>
    </Flex>
  );
};

export default FormInputSearch;
