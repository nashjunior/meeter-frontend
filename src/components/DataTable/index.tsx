/* eslint-disable react/require-default-props */
import React, { useCallback, useMemo, useState } from 'react';
import { DatatableContextData } from './context';
import {
  IColumns,
  IDatatableOption,
  IRemoteDatatableOptions,
} from './interfaces';
import LocalSourceDataTable from './LocalSourceDataTable';
import RemoteSourceDataTable from './RemoteSourceDataTable';

interface IDataFields {
  [key: string]: any;
}

interface IDataTableProps {
  columns: IColumns;
  options: IDatatableOption;
  serverData?: IRemoteDatatableOptions['serverData'];
  data?: IDataFields[];
}

const DataTable = React.memo(
  ({ columns, options, serverData, data }: IDataTableProps) => {
    const [dataList, setDataList] = useState<IDataFields[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const updateDatatable = useCallback((list: IDataFields[]) => {
      setDataList(list);
    }, []);

    const updateTotal = useCallback((newTotal: number) => {
      setTotal(newTotal);
    }, []);

    const updateTotalPage = useCallback((newTotal: number) => {
      setTotalPage(newTotal);
    }, []);

    const updatePage = useCallback((newTotal: number) => {
      setCurrentPage(newTotal);
    }, []);

    const updatePerPage = useCallback((newTotal: number) => {
      setPerPage(newTotal);
    }, []);

    const memoDatatable = useMemo(
      () => ({
        dataList,
        updateDatatable,
        total,
        updateTotal,
        totalPage,
        updateTotalPage,
        page: currentPage,
        perPage,
        updatePage,
        updatePerPage,
      }),
      [
        dataList,
        updateDatatable,
        total,
        updateTotal,
        totalPage,
        updateTotalPage,
        currentPage,
        perPage,
        updatePage,
        updatePerPage,
      ],
    );

    return (
      <DatatableContextData.Provider value={memoDatatable}>
        {serverData ? (
          <RemoteSourceDataTable
            columns={columns}
            options={{ ...options, serverData }}
          />
        ) : (
          <LocalSourceDataTable
            columns={columns}
            options={options}
            data={data}
          />
        )}
      </DatatableContextData.Provider>
    );
  },
);

export default DataTable;
