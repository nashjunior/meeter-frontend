/* eslint-disable react/require-default-props */
import React from 'react';
import * as _ from 'lodash';
import { Box, Flex } from '@chakra-ui/react';

import { IColumns, IDatatableOption } from '../interfaces';

interface IDataFields {
  [key: string]: any;
}

interface IDataTableProps {
  columns: IColumns;
  options?: IDatatableOption;
  data?: IDataFields[];
}

const DataTable: React.FC<IDataTableProps> = ({ columns, options, data }) => {
  return (
    <>
      <Flex>Local</Flex>

      <Box>aeuhae</Box>
    </>
  );
};

export default DataTable;
