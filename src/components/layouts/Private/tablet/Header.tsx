import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { FaListUl } from 'react-icons/fa';

export const HeaderMobile: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w="100%"
        height="10vh"
        justifyContent="space-between"
        alignItems="center"
        bg="Highlight"
      >
        <Button onClick={onOpen} ml={2}>
          <FaListUl />
        </Button>

        <Menu>
          {({ isOpen: isOpenProfile }) => (
            <>
              <MenuButton
                isActive={isOpenProfile}
                as={Button}
                colorScheme="white"
                color="gray.500"
                fontWeight="400"
                _hover={{ bg: { sm: '#fff' } }}
                borderRadius="0"
                h={20}
              >
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </MenuButton>

              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>Body</DrawerBody>

          <DrawerFooter>Um footer Qualquer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
