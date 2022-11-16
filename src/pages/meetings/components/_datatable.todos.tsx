import { useState } from 'react';
import DataTable from '../../../components/DataTable';
import {
  IColumns,
  IDatatableOption,
  IRemoteDatatableOptions,
} from '../../../components/DataTable/interfaces';
import { Input } from '../../../components/form';
import { useMeetingState } from '../../../hooks';
import { apiMeeting } from '../../../services/apiMeeting';

export const DatatableTodos: React.FC = () => {
  const { meeting } = useMeetingState();

  const [search, setSearch] = useState('');

  const columns: IColumns = [
    { field: 'todo', text: 'Todo', type: { name: 'text' } },
  ];

  const serverData: IRemoteDatatableOptions['serverData'] = {
    url: `${apiMeeting.defaults.baseURL}/meetings/${meeting.id}/todos`,
  };

  const options: IDatatableOption = {
    actions: {
      headerText: 'Actions',
      items: [],
    },
    filters: [
      {
        component: (
          <Input
            label="Pesquisar"
            onChange={e => setSearch(e.currentTarget.value)}
          />
        ),
        field: ['TODO'],
        value: search,
      },
    ],
  };

  return (
    <DataTable columns={columns} serverData={serverData} options={options} />
  );
};
