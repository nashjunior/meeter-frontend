import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FaMinus } from 'react-icons/fa';
import { Input } from '../../../components/form';
import { useMeetingState } from '../../../hooks';
import { apiMeeting } from '../../../services/apiMeeting';
import { createTodosSchema, IFormTodoInputs } from '../validation';

export const FormTodo: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<IFormTodoInputs>({
    resolver: yupResolver(createTodosSchema),
    defaultValues: { todos: [undefined] },
  });
  const { meeting } = useMeetingState();

  const handleCreateTodos = async (data: IFormTodoInputs) => {
    await apiMeeting.post(`meetings/${meeting.id}/todos`, data);
  };

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'todos' as never,
  });

  return (
    <Box as="form" onSubmit={handleSubmit(handleCreateTodos)}>
      <SimpleGrid columns={{ sm: 1, md: 1 }} gap={4} mb={2}>
        {fields.map((field, index) => (
          <Flex gap={4} key={field.id}>
            <Controller
              control={control}
              name={`todos.${index}`}
              render={({ field: fieldEvents, fieldState: { error } }) => (
                <Input {...fieldEvents} error={error} />
              )}
            />
            <Button colorScheme="blue" mr={3} onClick={() => remove(index)}>
              <FaMinus />
            </Button>
          </Flex>
        ))}
      </SimpleGrid>

      <Button colorScheme="yellow" mr={3} onClick={() => reset()}>
        Reset
      </Button>

      <Button colorScheme="blue" mr={3} onClick={() => append(undefined)}>
        Add
      </Button>

      <Button colorScheme="green" mr={3} type="submit">
        Save
      </Button>
    </Box>
  );
};
