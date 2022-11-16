interface IDataFields {
  [key: string]: any;
}

export type IResponsePaginaton = {
  total: number;
  totalPage: number;
  items: IDataFields[];
};
