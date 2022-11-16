export type IMeeting = {
  id: string;
  lat: number;
  long: number;
  name: string;
  description?: string;
  start: Date;
  end: Date;
};
