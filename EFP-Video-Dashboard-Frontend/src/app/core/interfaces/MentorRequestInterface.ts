import {PreferredGender} from "../enum/PreferredGender";

export interface MentorRequestInterface {
  id: number | null;
  dtmCreated: Date|null;
  dtmUpdated: Date|null;
  dtmDeleted: Date|null;
  status: number|null;
  name: string | null;
  gender: PreferredGender;
  description: string;
}
