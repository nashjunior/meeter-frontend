import { createContext } from 'use-context-selector';
import { IDatatableContextData } from './interfaces';

export const DatatableContextData = createContext<IDatatableContextData>(
  {} as IDatatableContextData,
);
