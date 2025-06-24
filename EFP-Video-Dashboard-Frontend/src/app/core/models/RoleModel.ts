/* istanbul ignore file */
import {RoleEnum} from "../enum/RoleEnum";

export class RoleModel {
  id: number | null;
  role: RoleEnum;

  constructor(id: number, role: RoleEnum) {
    this.id = id;
    this.role = role;

  }


}
