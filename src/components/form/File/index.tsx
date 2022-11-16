import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  InputProps as ChakraInputProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { memo, useRef } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { FaFile, FaSearch, FaTrash } from 'react-icons/fa';
import { Input } from '../Input';

export type IFileAction = {
  icon: React.ReactElement;
  action: (index?: number, url?: string) => void;
  tooltip: string;
};

export type IFile = Omit<ChakraInputProps, 'type'> & {
  filesErrors: FieldErrors;
  files: File[];
  actions: IFileAction[];
  // eslint-disable-next-line react/require-default-props
  inputRef?: React.MutableRefObject<HTMLInputElement>;
};

const InputFile = memo(function InputFile({
  onChange,
  multiple,
  files,
  filesErrors = {},
  actions,
  draggable,
  onDrag,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  inputRef = undefined,
  ...rest
}: IFile) {
  const preview =
    files.length > 0 ? files.map((file) => URL.createObjectURL(file)) : [];

  const previewSelected = useRef<{
    modalSize: string;
    url: string;
    type?: string;
  }>();

  const inputRefLocal = useRef<HTMLInputElement | null>(null);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const handleCloseModal = (): void => {
    previewSelected.current = undefined;
    onCloseModal();
  };

  return (
    <>
      <Flex
        direction="column"
        justifyContent="space-around"
        p={8}
        w="100%"
        minH={280}
        textAlign="center"
        verticalAlign="middle"
        padding={2}
      >
        <Box
          border="1px dashed #aaa"
          borderRadius={4}
          margin="4px 8px 4px 4px"
          draggable={draggable}
          onDrag={(e) => {
            e.stopPropagation();
            if (onDrag) onDrag(e as any);
          }}
          onDragEnter={(e) => {
            e.stopPropagation();
            if (onDragEnter) onDragEnter(e as any);
          }}
          onDragLeave={(e) => {
            e.stopPropagation();
            if (onDragLeave) onDragLeave(e as any);
          }}
          onDragOver={(e) => {
            e.stopPropagation();
            if (onDragOver) onDragOver(e as any);
          }}
          onDrop={(e) => {
            e.stopPropagation();
            if (onDrop) onDrop(e as any);
          }}
          onClick={() => {
            const ref = inputRef || inputRefLocal;

            if (ref.current) {
              ref.current?.click();
            }
          }}
        >
          {files.length < 1 ? (
            <Box
              color="#aaa"
              fontSize="1.6em"
              textAlign="center"
              padding="85px 10px"
              maxH="90%"
              w="100%"
            >
              Add file
            </Box>
          ) : (
            preview.map((url, index) => {
              return (
                <FormControl
                  key={url}
                  isInvalid={!!filesErrors?.[index]}
                  zIndex={2}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Box
                    m={8}
                    border="1px solid rgba(0,0,0,0.2)"
                    boxShadow="0 0 10px 0 rgb(0 0 0 / 20%)"
                    p={6}
                    float="left"
                    maxH="95%"
                    _hover={{ transform: 'scale(1.05)' }}
                    transition="transform 0.4s"
                    borderColor={filesErrors?.[index] ? 'red.300' : '#999'}
                  >
                    <Box width={213} height={163}>
                      {files[index]?.type.includes('image') && (
                        <Image
                          alt="test"
                          src={url}
                          width="100%"
                          height="100%"
                        />
                      )}

                      {files[index]?.type.includes('pdf') && (
                        <object
                          title="test"
                          data={url}
                          width="100%"
                          height="100%"
                          type="application/pdf"
                        />
                      )}

                      {!files[index]?.type.includes('image') &&
                        !files[index]?.type.includes('pdf') && (
                          <FaFile size="100%" />
                        )}
                    </Box>
                    <Box minH="100%" mb="auto">
                      <Box
                        textAlign="center"
                        paddingTop={4}
                        fontSize={11}
                        color="#999"
                        mb={30}
                      >
                        {files[index]?.name}
                      </Box>

                      <Box float="right">
                        <Tooltip label="Visualize file">
                          <Button
                            size="sm"
                            onClick={() => {
                              let size = 'md';
                              let type: string | undefined;
                              if (files[index]?.type.includes('image')) {
                                size = 'xl';
                                type = 'image';
                              }

                              if (files[index]?.type.includes('pdf')) {
                                size = '2xl';
                                type = 'pdf';
                              }

                              previewSelected.current = {
                                modalSize: size,
                                url,
                                type,
                              };

                              onOpenModal();
                            }}
                          >
                            <FaSearch />
                          </Button>
                        </Tooltip>
                        {actions.map((action, index2) => (
                          <Tooltip
                            label={action.tooltip}
                            key={`action${index2.toString()}`}
                          >
                            <Button
                              size="sm"
                              onClick={() => action.action(index, url)}
                              ml={2}
                            >
                              <span>
                                <FaTrash />
                              </span>
                            </Button>
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>
                    <FormErrorMessage mt="2px" marginTop={20} mb={0}>
                      {filesErrors?.[index]?.message}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              );
            })
          )}
        </Box>
        <Input
          margin="12px 15px 12px 12px"
          type="file"
          {...rest}
          onChange={(e) => {
            const element = e;
            if (onChange) onChange(e);
            element.currentTarget.value = '';
          }}
          multiple={multiple}
          ref={inputRef || inputRefLocal || null}
          error={
            filesErrors?.message
              ? {
                  message: filesErrors?.message as string,
                  type: filesErrors?.type as string,
                }
              : undefined
          }
        />
      </Flex>

      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        isCentered
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Visualize File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              {previewSelected.current?.type === 'image' && (
                <Image
                  src={previewSelected.current.url}
                  alt="preview image"
                  width={400}
                  height={400}
                />
              )}

              {previewSelected.current?.type === 'pdf' && (
                <iframe
                  title="PDF preview"
                  src={previewSelected.current?.url}
                  style={{ display: 'block' }}
                  width={800}
                  height={500}
                />
              )}
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export { InputFile };
