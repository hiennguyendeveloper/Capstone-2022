import {RoleModel} from "../models/RoleModel";

export interface UserInterfaceRoleModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  picture: string | null;
  role: RoleModel;
  progress: number;
  dtm_last_login: Date;
}
