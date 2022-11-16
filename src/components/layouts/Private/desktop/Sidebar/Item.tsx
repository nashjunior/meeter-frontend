import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IconBaseProps } from 'react-icons';

import { useSidebarDesktop } from './SidebarContext';

type IProps = {
  urlRedirect?: string;
  label: string;
  items?: IProps[];
  index?: boolean;
  icon?: React.ReactElement<IconBaseProps>;
};

export const ItemAccordion: React.FC<IProps> = ({
  label,
  index = true,
  icon: Icon,
  urlRedirect,
  items,
}) => {
  const { isOpen, handleActivateSidebar } = useSidebarDesktop();
  const router = useRouter();

  const hasItems = items ? items.length > 0 : false;

  const hasURL = !!urlRedirect && isOpen;

  const color = useColorModeValue('gray.700', 'teal.300');
  const color2 = useColorModeValue('gray.100', 'teal.300');
  const colorHover = useColorModeValue('blue.400', undefined);

  const bgHover = useColorModeValue('blue.100', 'green.500');

  return (
    <Tooltip label={label} placement="left" hasArrow isDisabled={isOpen}>
      <AccordionItem transition="all 0.3s" border="none">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              onClick={
                hasURL
                  ? (e) => {
                      e.preventDefault();

                      router.push(urlRedirect);
                    }
                  : !isOpen
                  ? () => handleActivateSidebar()
                  : undefined
              }
              _focus={{ boxShadow: 'none' }}
              _hover={{ background: bgHover }}
              px={`${isOpen ? '18px' : '16px'}`}
              _expanded={
                isOpen
                  ? { color, background: index ? undefined : bgHover }
                  : undefined
              }
              disabled={!isOpen}
              height="70px"
            >
              <Flex
                direction="row"
                alignItems="center"
                height="100%"
                w="100%"
                float="left"
                gap="20%"
                justifyContent={!isOpen ? 'center' : undefined}
                color={index ? color : color2}
                fontWeight={index ? 'bold' : undefined}
                _hover={{ color: index ? undefined : colorHover }}
              >
                {Icon}
                {isOpen && label}
                {hasItems && isOpen && <AccordionIcon />}
              </Flex>
            </AccordionButton>

            <AccordionPanel
              pb={0}
              p={0}
              style={
                !isOpen || !isExpanded
                  ? {
                      overflow: 'hidden',
                      display: 'none',
                      opacity: 0,
                      height: '0px',
                    }
                  : {}
              }
            >
              <Accordion allowToggle ml={8}>
                {items?.map((item) => (
                  <ItemAccordion {...item} key={JSON.stringify(item)} />
                ))}
              </Accordion>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Tooltip>
  );
};
