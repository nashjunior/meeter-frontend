import { IMeeting } from '../../interfaces';

export type IMeetingContextData = {
  meeting: IMeeting;
  updateMeetingState(data: Partial<IMeeting>): void;
};
