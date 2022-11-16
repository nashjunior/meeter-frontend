import { Button, Flex } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

interface IFieldSort {
  field: string;
  sort: 'OFF' | 'ASC' | 'DESC';
}

interface IHeaderColumnProps {
  field: string;
  text: string;

  handleFieldSort(field: IFieldSort): void;
}

type Sorts = 'OFF' | 'ASC' | 'DESC';

const HeaderColumn: React.FC<IHeaderColumnProps> = ({
  field,
  text,
  handleFieldSort,
}) => {
  const [sort, setSort] = useState<Sorts>('OFF');
  const [active, setActive] = useState(false);

  const handleClickSort = useCallback(() => {
    function getSort(sortOption: Sorts): Sorts {
      switch (sortOption) {
        case 'OFF':
          return 'ASC';
        case 'ASC':
          return 'DESC';
        case 'DESC':
          return 'OFF';
        default:
          return 'OFF';
      }
    }
    const newSort = getSort(sort);

    setSort(newSort);
    handleFieldSort({ field, sort: newSort });
    if (newSort !== 'OFF') {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [sort, handleFieldSort, field]);

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      {text}

      {sort === 'OFF' || sort === 'ASC' ? (
        <Button size="sm" type="button" onClick={handleClickSort}>
          <FaSortAmountUp />
        </Button>
      ) : (
        <Button type="button" onClick={handleClickSort}>
          <FaSortAmountDown />
        </Button>
      )}
    </Flex>
  );
};

export default HeaderColumn;
