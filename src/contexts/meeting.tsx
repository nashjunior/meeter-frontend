import { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';
import { IMeeting } from '../interfaces';
import { IMeetingContextData } from './interfaces/IMeetingContextData';

type IProps = { children: React.ReactNode };

export const MeetingContextData = createContext({} as IMeetingContextData);
export const MeetingProvider: React.FC<IProps> = ({ children }) => {
  const [meeting, setMeeting] = useState<IMeeting>({} as IMeeting);

  const updateMeetingState = useCallback(
    (newValue: Partial<IMeeting>) => {
      setMeeting({ ...meeting, ...(newValue as IMeeting) });
    },
    [meeting],
  );

  const value = useMemo(
    () => ({ meeting, updateMeetingState }),
    [meeting, updateMeetingState],
  );

  return (
    <MeetingContextData.Provider value={value}>
      {children}
    </MeetingContextData.Provider>
  );
};
