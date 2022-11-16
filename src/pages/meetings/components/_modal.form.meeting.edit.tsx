import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LatLng } from 'leaflet';
import { FaPlus } from 'react-icons/fa';
import { createMeetingSchema, IFormMeetingInputs } from '../validation';
import { DatePicker, Input, TextArea } from '../../../components/form';
import { apiMeeting } from '../../../services/apiMeeting';
import { useMeetingState } from '../../../hooks';
import { FormTodo } from './_form.todo';
import { DatatableTodos } from './_datatable.todos';

type IProps = Omit<ModalProps, 'children'> & {
  position?: LatLng;
};

export const ModalFormEditMeeting: React.FC<IProps> = ({
  isOpen,
  onClose,
  position,
  ...rest
}) => {
  const toast = useToast();
  const { meeting } = useMeetingState();

  const { control, handleSubmit, reset } = useForm<IFormMeetingInputs>({
    resolver: yupResolver(createMeetingSchema),
  });

  const {
    isOpen: isOpendEditing,
    onToggle: onToggleEditing,
    onClose: onCloseEditing,
  } = useDisclosure();

  const handleCLoseModal = () => {
    onCloseEditing();
    onClose();
  };

  const handleCreateMeeting = async (data: IFormMeetingInputs) => {
    try {
      await apiMeeting.post('meetings', {
        ...data,
        lat: position?.lat,
        long: position?.lng,
      });

      toast({
        title: 'Sucess',
        description: 'Meeting Created',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Ocorreu um erro.',
        description: error.response?.data?.message || 'Internal Server Error',
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCLoseModal} {...rest}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          Meeting {meeting.name}
          <Tooltip label="See todos">
            <Button ml="auto">
              <FaPlus />
            </Button>
          </Tooltip>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Form</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box as="form" onSubmit={handleSubmit(handleCreateMeeting)}>
                  <SimpleGrid columns={{ sm: 1, md: 3 }} gap={4} mb={4}>
                    <Controller
                      control={control}
                      name="name"
                      defaultValue={meeting.name}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          label="Name"
                          {...field}
                          error={error}
                          isRequired
                          isDisabled={!isOpendEditing}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="start"
                      defaultValue={meeting.start}
                      render={({
                        field: { value, ...restField },
                        fieldState: { error },
                      }) => (
                        <DatePicker
                          label="Start date"
                          selected={value}
                          {...restField}
                          error={error}
                          dateFormat="dd/MM/yyyy HH:mm:ss"
                          showTimeSelect
                          required
                          disabled={!isOpendEditing}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="end"
                      defaultValue={meeting.end}
                      render={({
                        field: { value, ...restField },
                        fieldState: { error },
                      }) => (
                        <DatePicker
                          label="End date"
                          selected={value}
                          {...restField}
                          error={error}
                          dateFormat="dd/MM/yyyy HH:mm:ss"
                          showTimeSelect
                          required
                          disabled={!isOpendEditing}
                        />
                      )}
                    />
                  </SimpleGrid>

                  <SimpleGrid columns={1} mb={2}>
                    <Controller
                      control={control}
                      name="description"
                      defaultValue={meeting.description}
                      render={({ field, fieldState: { error } }) => (
                        <TextArea
                          label="Description"
                          {...field}
                          error={error}
                          cols={4}
                          isDisabled={!isOpendEditing}
                        />
                      )}
                    />
                  </SimpleGrid>

                  <Button
                    colorScheme="yellow"
                    mr={3}
                    onClick={() => {
                      onToggleEditing();
                      reset();
                    }}
                  >
                    {!isOpendEditing ? 'Edit' : 'Disable'}
                  </Button>

                  <Button colorScheme="blue" mr={3} onClick={() => reset()}>
                    Reset
                  </Button>

                  <Button colorScheme="green" mr={3} type="submit">
                    Save
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel>
                <FormTodo />
                <DatatableTodos />
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleCLoseModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
