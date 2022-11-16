import * as yup from 'yup';

export type IFormMeetingInputs = {
  name: string;
  start: Date;
  end: Date;
  description?: string;
};

export type IFormTodoInputs = { todos: string[] };

export const createMeetingSchema = yup.object().shape({
  name: yup.string().required().max(128),
  start: yup.date().required(),
  end: yup.date().required(),
  description: yup.string().notRequired(),
});

export const createTodosSchema = yup.object().shape({
  todos: yup.array().of(yup.string().required()),
});
