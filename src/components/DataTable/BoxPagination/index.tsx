import { Box, Flex } from '@chakra-ui/react';
import Select from '../FormSelect';
import { usePagination, usePaginationResponse, useResponse } from '../hooks';
import Paginator from '../Paginator';

const perPageItems = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
];

export const BoxPagination: React.FC = () => {
  const { page, perPage, updatePage, updatePerPage } = usePagination();
  const { total } = usePaginationResponse();
  const { dataList } = useResponse();

  const handleChangePerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    updatePerPage(Number(event.currentTarget.value));
    updatePage(1);
  };

  const handleChangePage = (selectedPage: number): void => {
    updatePage(selectedPage);
  };
  const handleMessageDatalist = () => {
    if (dataList.length === 0) return 'Nenhum registro encontrado';

    const message = `Mostrando de ${perPage * page - perPage + 1}`;

    const totalRegistro = dataList.length + perPage * (page - 1);

    message.concat(` ${totalRegistro} de ${total}`);

    message.concat(total === 1 ? 'registro' : 'registros');

    return message;
  };
  return (
    <Flex
      direction="row"
      mt={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>{handleMessageDatalist()}</Box>

      {dataList.length >= 1 && (
        <>
          <Flex direction="row" alignItems="center" w={220} mt={4}>
            <Flex w={32}>
              <Select
                optionsSelect={perPageItems}
                onChange={handleChangePerPage}
              />
            </Flex>
            <Box w={180} ml={8} fontSize={16}>
              <span>por página</span>
            </Box>
          </Flex>

          <Paginator handleChangePage={handleChangePage} />
        </>
      )}
    </Flex>
  );
};
