import {RoleEnum} from "../enum/RoleEnum";

export class UserAuthModel {
  constructor(public email: string, public exp: Date, public role: RoleEnum, public access_token: string) {

  }

  toString() {
    return this.email;
  }
}
