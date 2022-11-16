import { useContextSelector } from 'use-context-selector';
import { DatatableContextData } from '../context';
import { IDatatableContextData } from '../interfaces';

export const usePaginationResponse = (): Pick<
  IDatatableContextData,
  'totalPage' | 'total'
> => {
  const total = useContextSelector(
    DatatableContextData,
    ({ total: page1 }) => page1,
  );

  const totalPage = useContextSelector(
    DatatableContextData,
    ({ totalPage: perPage1 }) => perPage1,
  );

  return { total, totalPage };
};
