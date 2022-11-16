import {
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
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LatLng } from 'leaflet';
import { createMeetingSchema, IFormMeetingInputs } from '../validation';
import { DatePicker, Input, TextArea } from '../../../components/form';
import { apiMeeting } from '../../../services/apiMeeting';

type IProps = Omit<ModalProps, 'children'> & {
  position?: LatLng;
};

export const ModalFormMeeting: React.FC<IProps> = ({
  isOpen,
  onClose,
  position,
  ...rest
}) => {
  const toast = useToast();

  const { control, handleSubmit, reset } = useForm<IFormMeetingInputs>({
    resolver: yupResolver(createMeetingSchema),
  });

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
    <Modal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleCreateMeeting)}>
          <ModalBody>
            <SimpleGrid columns={{ sm: 1, md: 3 }} gap={4} mb={4}>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <Input label="Name" {...field} error={error} isRequired />
                )}
              />

              <Controller
                control={control}
                name="start"
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
                  />
                )}
              />

              <Controller
                control={control}
                name="end"
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
                  />
                )}
              />
            </SimpleGrid>

            <SimpleGrid columns={1}>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <TextArea
                    label="Description"
                    {...field}
                    error={error}
                    cols={4}
                  />
                )}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>

            <Button colorScheme="yellow" mr={3} onClick={() => reset()}>
              Reset
            </Button>

            <Button colorScheme="green" mr={3} type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
