export interface VideoListInterface {
  id: number | null;
  videoName: string;
  videoDescription: string | null;
  videoPath: string;
  dtmCreated: Date | null;
  dtmUpdated: Date | null;
  dtmDeleted: Date | null;
}
