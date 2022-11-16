import { IMeetingContextData } from '../../contexts';

export type IMeetingState = Pick<
  IMeetingContextData,
  'meeting' | 'updateMeetingState'
>;
