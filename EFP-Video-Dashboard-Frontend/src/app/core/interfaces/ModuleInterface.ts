import {SectionInterface} from "./SectionInterface";

export interface ModuleInterface {
  id: number | null;
  moduleName: string;
  moduleDescription: string | null;
  dtmCreated: Date | null;
  dtmUpdated: Date | null;
  dtmDeleted: Date | null;
  section: SectionInterface | number | null;
  picture: String | null;
}
