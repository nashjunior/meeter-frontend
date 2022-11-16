import { Button, Flex } from '@chakra-ui/react';
import { FaListUl } from 'react-icons/fa';

type IProps = { handleActiveSidebar: () => void };

export const HeaderDesktop: React.FC<IProps> = ({ handleActiveSidebar }) => {
  return (
    <Flex maxW="100vw" zIndex={0}>
      <Button onClick={handleActiveSidebar}>
        <FaListUl />
      </Button>
    </Flex>
  );
};
