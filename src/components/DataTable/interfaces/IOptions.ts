import { AxiosRequestConfig } from 'axios';
import { IFilter } from './IFilter';
import { IWidgetType } from './IWidget';

export type IDatatableOption = {
  actions?: {
    headerText: string;
    items: {
      icon: React.ReactElement;
      tooltip: string;
      getRow(row: any): void;
      handleShowAction?: (row: any) => boolean;
    }[];
  };
  filters?: IFilter[];

  order?: {
    fields: string[];
    orders?: any;
  };
  columnOrder?: {
    visible: boolean;
    label: string;
  };
  selectMultiline?: {
    visible: boolean;
    primaryColumn: string;
    stateSelectedRows: any[];
  };
  exportCsv?: {
    label: string;
    filename: string;
    columns: {
      field: string;
      title: string;
    }[];
  };
  widgets?: IWidgetType[];
};

export type IRemoteDatatableOptions = IDatatableOption & {
  serverData: {
    url: string;
    headers?: AxiosRequestConfig['headers'];
    serverPagination?: boolean;
    params?: string;
  };
};
