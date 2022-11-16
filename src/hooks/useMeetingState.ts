import { useContextSelector } from 'use-context-selector';
import { MeetingContextData } from '../contexts';
import { IMeetingState } from '../interfaces';

export const useMeetingState = (): IMeetingState => ({
  meeting: useContextSelector(
    MeetingContextData,
    ({ meeting: meetingContext }) => meetingContext,
  ),
  updateMeetingState: useContextSelector(
    MeetingContextData,
    ({ updateMeetingState: meetingContext }) => meetingContext,
  ),
});
