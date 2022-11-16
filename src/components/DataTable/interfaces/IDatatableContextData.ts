interface IDataFields {
  [key: string]: any;
}

export type IDatatableContextData = {
  dataList: IDataFields[];
  updateDatatable(list: IDataFields[]): void;

  total: number;
  updateTotal(total: number): void;

  totalPage: number;
  updateTotalPage(total: number): void;

  page: number;
  updatePage(page: number): void;

  perPage: number;
  updatePerPage(perPage: number): void;
};
