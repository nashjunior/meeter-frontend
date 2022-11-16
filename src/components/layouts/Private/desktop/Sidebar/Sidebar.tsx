import {
  Accordion,
  Flex,
  GridItem,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCar, FaHome, FaWrench } from 'react-icons/fa';
import { ItemAccordion } from './Item';
import { useSidebarDesktop } from './SidebarContext';

type IProps = {
  urlRedirect?: string;
  label: string;
  items?: IProps[];
  icon?: React.ReactElement;
};

const items: IProps[] = [
  {
    urlRedirect: '/',
    items: [],
    icon: <FaHome color="var(--chakra-colors-gray-100)" />,
    label: 'Home',
  },

  {
    label: 'Vehicles',
    icon: <FaCar color="var(--chakra-colors-gray-100)" />,
    items: [
      {
        label: 'Index',
        urlRedirect: '/vehicles',
        icon: <FaCar />,
        index: false,
      },
    ],
  },
  {
    urlRedirect: '/parts',
    items: [],
    icon: <FaWrench color="var(--chakra-colors-gray-100)" />,
    label: 'Parts',
  },
];

export const Sidebar: React.FC = () => {
  const { isOpen } = useSidebarDesktop();

  const { toggleColorMode, colorMode } = useColorMode();

  const color = useColorModeValue('gray.700', 'teal.300');

  return (
    <GridItem
      as="aside"
      w={isOpen ? '12vw' : '4vw'}
      transition="width 0.6s"
      gridArea="nav"
      color={color}
      boxShadow="4px 0px 9px -4px rgba(0, 0, 0, 0.71)"
    >
      <Accordion allowToggle>
        {items.map((item) => (
          <ItemAccordion {...item} key={item.label} />
        ))}
      </Accordion>

      {isOpen && (
        <Flex
          direction="column"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          fontWeight="bold"
        >
          Dark
          <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        </Flex>
      )}
    </GridItem>
  );
};
