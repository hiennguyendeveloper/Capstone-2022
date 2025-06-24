import {ModuleInterface} from "./ModuleInterface";
import {VideoListInterface} from "./VideoListInterface";
import {WorkbookInterface} from "./WorkbookInterface";

export interface LessonInterface {
  id: number | null;
  lessonName: string;
  dtmCreated: Date | null;
  dtmUpdated: Date | null;
  dtmDeleted: Date | null;
  module: ModuleInterface | number | null;
  video: VideoListInterface | null;
  workbook: WorkbookInterface | null;
  picture: String | null;
}
