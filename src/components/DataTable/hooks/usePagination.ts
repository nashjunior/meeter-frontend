import { useContextSelector } from 'use-context-selector';
import { DatatableContextData } from '../context';

import { IDatatableContextData } from '../interfaces';

export const usePagination = (): Pick<
  IDatatableContextData,
  'page' | 'perPage' | 'updatePage' | 'updatePerPage'
> => {
  const page = useContextSelector(
    DatatableContextData,
    ({ page: page1 }) => page1,
  );
  const updatePage = useContextSelector(
    DatatableContextData,
    ({ updatePage: updatePage1 }) => updatePage1,
  );
  const perPage = useContextSelector(
    DatatableContextData,
    ({ perPage: perPage1 }) => perPage1,
  );
  const updatePerPage = useContextSelector(
    DatatableContextData,
    ({ updatePerPage: updatePerPage1 }) => updatePerPage1,
  );

  return {
    page,
    perPage,
    updatePage,
    updatePerPage,
  };
};
